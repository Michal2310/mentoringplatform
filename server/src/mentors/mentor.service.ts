import { ForbiddenError } from '@casl/ability';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { Mentors } from '@prisma/client';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { StatusType } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';
import { PrismaService } from '../prisma/prisma.service';
import { MentorDto } from './dto';

@Injectable()
export class MentorService {
  constructor(
    private prisma: PrismaService,
    private abilityFactory: AbilityFactory,
    private mailer: MailService,
    private mailerTemplate: MailerTemplate,
  ) {}

  private getUserFields() {
    return {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      title: true,
      about: true,
      country: true,
      skills: true,
      languages: true,
      image: {
        select: { fileUrl: true },
      },
    };
  }

  async getAllMentors(page: number): Promise<Mentors[]> {
    try {
      const skip: number = 20 * (page - 1);
      const mentors = await this.prisma.mentors.findMany({
        skip,
        take: 20,
        where: { status: 'Accepted' },
        include: {
          user: { select: this.getUserFields() },
          favoriteMentors: true,
        },
      });
      if (mentors.length <= 0) throw new NotFoundException('');
      return mentors;
    } catch (error) {
      throw error;
    }
  }
  async getMentor(id: number) {
    try {
      const mentor = await this.prisma.users.findFirst({
        where: {
          id,
        },
        select: this.getUserFields(),
      });
      if (!mentor) throw new NotFoundException('Mentor not found!');
      await this.prisma.mentors.update({
        where: { userId: id },
        data: {
          views: {
            increment: 1,
          },
        },
      });
      return mentor;
    } catch (error) {
      throw error;
    }
  }
  async sendMentorRequest(userId: number, dto: MentorDto) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id: userId } });
      if (!user) return new NotFoundException();
      const existingMentor = await this.prisma.mentors.findFirst({ where: { userId } });
      if (existingMentor) return new ConflictException();
      const updatedUser = this.prisma.users.update({
        where: { id: userId },
        data: {
          firstname: dto.firstname,
          lastname: dto.lastname,
          title: dto.title,
          about: dto.about,
          skills: {
            set: dto.skills.map((skill) => {
              return { skill };
            }),
          },
          languages: {
            set: dto.languages.map((language) => {
              return { language };
            }),
          },
          country: {
            set: {
              country: dto.country,
            },
          },
        },
      });
      const mentor = this.prisma.mentors.create({ data: { userId } });
      await this.prisma.$transaction([updatedUser, mentor]);
      return { message: 'Mentor request sent!' };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2025') {
          throw new BadRequestException();
        }
      throw error;
    }
  }

  async favoriteMentor(userId: number, mentorId: number) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
      });
      const mentor = await this.prisma.mentors.findUnique({ where: { userId: mentorId } });
      if (!user || !mentor) throw new ForbiddenException();
      const existingFavoriteMentor = await this.prisma.favoriteMentors.findFirst({
        where: {
          mentor: {
            userId: mentorId,
          },
          user: {
            id: userId,
          },
        },
      });
      if (existingFavoriteMentor) {
        return await this.prisma.favoriteMentors.deleteMany({
          where: {
            mentor: {
              userId: mentorId,
            },
            user: {
              id: userId,
            },
          },
        });
      }
      const addFavoriteMentor = await this.prisma.favoriteMentors.create({
        data: {
          mentor: {
            connect: {
              userId: mentorId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });

      return addFavoriteMentor;
    } catch (error) {
      throw error;
    }
  }

  async verifyPendingMentorRequests(
    userId: number,
    mentorId: number,
    status: StatusType,
  ): Promise<{
    message: string;
  }> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
      });
      const ability = this.abilityFactory.createForUser(user);
      ForbiddenError.from(ability).throwUnlessCan(Action.Update, user);
      const updatedUser = this.prisma.users.update({
        where: { id: mentorId },
        data: { isMentor: status === StatusType.Accepted ? true : false },
      });
      const mentor = this.prisma.mentors.update({
        where: { id: mentorId },
        data: {
          status: { set: status },
        },
      });
      await this.mailer.sendMail(user.email, this.mailerTemplate.mentorStatus());
      await this.prisma.$transaction([updatedUser, mentor]);
      return { message: 'User and mentor updated' };
    } catch (error) {
      if (error instanceof ForbiddenError) throw new UnauthorizedException();
      throw error;
    }
  }
}
