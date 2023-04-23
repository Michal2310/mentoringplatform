import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Mentorships } from '@prisma/client';
import { StatusType } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';
import { PrismaService } from '../prisma/prisma.service';
import { MentorshipDto } from './dto';

@Injectable()
export class MentorshipService {
  constructor(
    private prisma: PrismaService,
    private mailer: MailService,
    private mailerTemplate: MailerTemplate,
  ) {}

  private async sendEmail(email: string) {
    return await this.mailer.sendMail(email, this.mailerTemplate.mentorshipStatus());
  }

  async sendMentorshipRequest(
    userId: number,
    mentorId: number,
    dto: MentorshipDto,
  ): Promise<Mentorships> {
    try {
      const mentor = await this.prisma.mentors.findFirst({
        where: {
          user: {
            id: mentorId,
          },
          status: 'Accepted',
        },
      });

      if (!mentor) throw new NotFoundException();

      const latestUserMentorshipRequest = await this.prisma.mentorships.findFirst({
        where: {
          senderId: userId,
          mentorId: mentor.id,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (latestUserMentorshipRequest) {
        const daysSinceLastRequest =
          (new Date().getTime() - new Date(latestUserMentorshipRequest.createdAt).getTime()) /
          (1000 * 60 * 60 * 24);

        if (daysSinceLastRequest < 5) {
          throw new ConflictException('You cannot send a request more than once every 5 days');
        }
      }

      const mentorshipRequest = await this.prisma.mentorships.create({
        data: {
          senderId: userId,
          mentorId: mentor.id,
          background: dto.background,
          expectations: dto.expectations,
          message: dto.message,
        },
      });

      return mentorshipRequest;
    } catch (error) {
      throw error;
    }
  }

  async getUserMentorshipsRequests(userId: number, limit: string): Promise<Mentorships[]> {
    try {
      const mentorships = await this.prisma.mentorships.findMany({
        where: {
          senderId: userId,
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
        take: Number(limit),
      });
      return mentorships;
    } catch (error) {
      throw error;
    }
  }

  async getReceivedMentorshipsRequests(userId: number, limit: string) {
    try {
      const receivedMentorshipsRequests = await this.prisma.mentorships.findMany({
        where: {
          mentor: {
            userId,
            status: 'Accepted',
          },
        },
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
        take: Number(limit),
      });
      return receivedMentorshipsRequests;
    } catch (error) {
      throw error;
    }
  }

  private async updateMentorship(prisma: PrismaService, requestId: number, data?: Object) {
    try {
      const mentorship = await prisma.mentorships.update({
        where: { id: requestId },
        data,
      });
      return mentorship;
    } catch (error) {
      throw error;
    }
  }

  async verifyPendingMentorships(
    mentorId: number,
    requestId: number,
    mentorshipStatus: StatusType,
  ): Promise<Mentorships> {
    try {
      const { senderId } = await this.prisma.mentorships.findUnique({
        where: {
          id: requestId,
        },
        select: {
          senderId: true,
        },
      });
      if (!senderId) throw new ConflictException();
      const updatedMentorship = await this.updateMentorship(this.prisma, requestId, {
        status: mentorshipStatus,
      });
      if (updatedMentorship.status === 'Accepted') {
        await this.prisma.rooms.create({
          data: {
            users: {
              connect: [
                {
                  id: mentorId,
                },
                {
                  id: senderId,
                },
              ],
            },
          },
        });
        // const { email } = await this.prisma.users.findUnique({
        //   where: { id: senderId },
        // });
        // await this.sendEmail(email);
      }
      return updatedMentorship;
    } catch (error) {
      throw error;
    }
  }
}
