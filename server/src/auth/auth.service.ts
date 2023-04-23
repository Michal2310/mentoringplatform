import { ForbiddenException, Injectable, Redirect } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { randomBytes, createHash } from 'crypto';
import * as argon from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private mailer: MailService,
    private mailerTemplate: MailerTemplate,
  ) {}

  async register(dto: RegisterDto): Promise<Tokens> {
    try {
      const hashedPassword = await argon.hash(dto.password);
      const verificationToken = await this.generatateCode(5);
      const { id, email } = await this.prisma.users.create({
        data: {
          email: dto.email,
          password: hashedPassword,
          verifyToken: verificationToken,
        },
      });
      const avatarUrl = generateAvatarUrl(email);
      const avatarName = randomBytes(8).toString('hex');
      await this.prisma.images.create({
        data: {
          userId: id,
          fileUrl: avatarUrl,
          fileName: avatarName,
          key: avatarName,
        },
      });
      //await this.mailer.sendMail(email, this.mailerTemplate.verification(verifyToken, email));
      const tokens = await this.getTokens(id, email);
      await this.updateRefreshToken(id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002') throw new ForbiddenException('Credentials taken');
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: dto.email,
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          password: true,
          about: true,
          title: true,
          country: true,
          languages: true,
          skills: true,
          image: true,
          isMentor: true,
        },
      });
      if (!user) throw new ForbiddenException('Access denied');
      const passwordMatch = await argon.verify(user.password, dto.password);
      if (!passwordMatch) throw new ForbiddenException('Access denied');
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      delete user.password;
      return { tokens, user };
    } catch (error) {
      if (error instanceof ForbiddenException)
        throw new ForbiddenException('Email or password is incorrect');
      throw error;
    }
  }

  async logout(userId: number) {
    try {
      return await this.prisma.users.updateMany({
        where: {
          id: userId,
          refreshToken: {
            not: null,
          },
        },
        data: {
          refreshToken: null,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async sendRecoveryLink(email: string) {
    try {
      const code = await this.generatateCode(6);
      const user = await this.prisma.users.findUnique({
        where: { email },
      });
      if (!user) throw new ForbiddenException();
      const updatedUser = await this.prisma.users.update({
        where: { email },
        data: {
          recoveryCode: code,
        },
      });
      // await this.mailer.sendMail(email, this.mailerTemplate.verification(code, email));
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(code: string, email: string, password: string) {
    try {
      const user = await this.prisma.users.findUnique({ where: { email } });
      if (!user || user.recoveryCode.toString() !== code.toString())
        throw new ForbiddenException();
      const newPassword = await argon.hash(password);
      const updatedUser = await this.prisma.users.update({
        where: { email },
        data: {
          password: newPassword,
          recoveryCode: '',
        },
      });
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async refresh(userId: number, rt: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      if (!user || user.refreshToken) throw new ForbiddenException('Acccess denied');
      const refreshTokenMatch = await argon.verify(user.refreshToken, rt);
      if (!refreshTokenMatch) throw new ForbiddenException('Acccess denied');
      const tokens = await this.getTokens(user.id, user.email);
      await this.updateRefreshToken(user.id, tokens.refresh_token);
      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async verificationToken(verificationToken: string, email: string) {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email,
        },
      });
      if (!user) return null;
      if (user.verifyToken == verificationToken) {
        Redirect(`http://localhost:${this.config.get('PORT')}/`, 200);
        return await this.prisma.users.update({
          where: {
            email,
          },
          data: {
            isVerified: true,
          },
        });
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  async getTokens(userId: number, email: string): Promise<Tokens> {
    const secret = this.config.get('JWT_SECRET');
    const refresh = this.config.get('JWT_REFRESH');
    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync({ sub: userId, email }, { secret, expiresIn: 60 * 60 * 60 }),
      this.jwt.signAsync(
        { sub: userId, email },
        { secret: refresh, expiresIn: 60 * 60 * 24 * 7 },
      ),
    ]);

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshToken(userId: number, rt: string) {
    const hashedRefreshToken = await argon.hash(rt);
    await this.prisma.users.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: hashedRefreshToken,
      },
    });
  }

  async generatateCode(bytes: number) {
    return randomBytes(bytes).toString('hex');
  }
}

const generateAvatarUrl = (emailAddress: string) => {
  const emailHash = createHash('md5').update(emailAddress).digest('hex');
  return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};
