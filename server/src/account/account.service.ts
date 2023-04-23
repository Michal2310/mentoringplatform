import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { ForbiddenError } from '@casl/ability';
import * as argon from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import { AbilityFactory, Action } from '../ability/ability.factory';
import { MentorDto } from '../mentors/dto';
@Injectable()
export class AccountService {
  constructor(private prisma: PrismaService, private abilityFactory: AbilityFactory) {}
  async getUserAccountDetails(userId: number): Promise<Users> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
        include: {
          country: true,
          languages: {
            select: {
              language: true,
            },
          },
          skills: {
            select: {
              skill: true,
            },
          },
          image: {
            select: {
              fileUrl: true,
            },
          },
        },
      });
      if (!user) throw new NotFoundException();
      delete user.password;
      delete user.refreshToken;
      delete user.verifyToken;
      return user;
    } catch (error) {
      throw error;
    }
  }
  async changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<Users> {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
      });
      const ability = this.abilityFactory.createForUser(user);
      ForbiddenError.from(ability).throwUnlessCan(Action.Manage, user);
      const isPasswordsMatch = await argon.verify(
        user.password.toString(),
        oldPassword.toString(),
      );
      if (!isPasswordsMatch) throw new ForbiddenException();
      const hashedPassword = await argon.hash(newPassword);
      const updatedUser = await this.prisma.users.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedPassword,
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async updateUser(userId: number, dto: MentorDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: { id: userId },
        include: {
          country: true,
          skills: true,
        },
      });

      const ability = this.abilityFactory.createForUser(user);
      ForbiddenError.from(ability).throwUnlessCan(Action.Manage, user);
      const updatedUser = await this.prisma.users.update({
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
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }
  async getSkills(userId: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id: userId } });
      if (!user) throw new ForbiddenException();
      const skills = await this.prisma.skills.findMany();
      return skills;
    } catch (error) {
      throw error;
    }
  }
  async getLanguages(userId: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id: userId } });
      if (!user) throw new ForbiddenException();
      const languages = await this.prisma.languages.findMany();
      return languages;
    } catch (error) {
      throw error;
    }
  }
  async getCountry(userId: number) {
    try {
      const user = await this.prisma.users.findUnique({ where: { id: userId } });
      if (!user) throw new ForbiddenException();
      const countries = await this.prisma.countries.findMany();
      return countries;
    } catch (error) {
      throw error;
    }
  }
}
