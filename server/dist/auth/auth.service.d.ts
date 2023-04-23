import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import { Tokens } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';
export declare class AuthService {
    private prisma;
    private jwt;
    private config;
    private mailer;
    private mailerTemplate;
    constructor(prisma: PrismaService, jwt: JwtService, config: ConfigService, mailer: MailService, mailerTemplate: MailerTemplate);
    register(dto: RegisterDto): Promise<Tokens>;
    login(dto: LoginDto): Promise<{
        tokens: Tokens;
        user: {
            id: number;
            email: string;
            firstname: string;
            lastname: string;
            password: string;
            image: import(".prisma/client").Images[];
            isMentor: boolean;
            languages: import(".prisma/client").Languages[];
            skills: import(".prisma/client").Skills[];
            country: import(".prisma/client").Countries[];
            title: string;
            about: string;
        };
    }>;
    logout(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
    sendRecoveryLink(email: string): Promise<import(".prisma/client").Users>;
    updatePassword(code: string, email: string, password: string): Promise<import(".prisma/client").Users>;
    refresh(userId: number, rt: string): Promise<Tokens>;
    verificationToken(verificationToken: string, email: string): Promise<import(".prisma/client").Users>;
    getTokens(userId: number, email: string): Promise<Tokens>;
    updateRefreshToken(userId: number, rt: string): Promise<void>;
    generatateCode(bytes: number): Promise<string>;
}
