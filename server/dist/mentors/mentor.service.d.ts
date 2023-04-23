import { NotFoundException, ConflictException } from '@nestjs/common';
import { Mentors } from '@prisma/client';
import { AbilityFactory } from '../ability/ability.factory';
import { StatusType } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';
import { PrismaService } from '../prisma/prisma.service';
import { MentorDto } from './dto';
export declare class MentorService {
    private prisma;
    private abilityFactory;
    private mailer;
    private mailerTemplate;
    constructor(prisma: PrismaService, abilityFactory: AbilityFactory, mailer: MailService, mailerTemplate: MailerTemplate);
    private getUserFields;
    getAllMentors(page: number): Promise<Mentors[]>;
    getMentor(id: number): Promise<{
        email: string;
        id: number;
        firstname: string;
        lastname: string;
        image: {
            fileUrl: string;
        }[];
        languages: import(".prisma/client").Languages[];
        skills: import(".prisma/client").Skills[];
        country: import(".prisma/client").Countries[];
        title: string;
        about: string;
    }>;
    sendMentorRequest(userId: number, dto: MentorDto): Promise<NotFoundException | ConflictException | {
        message: string;
    }>;
    favoriteMentor(userId: number, mentorId: number): Promise<import(".prisma/client").Prisma.BatchPayload | import(".prisma/client").FavoriteMentors>;
    verifyPendingMentorRequests(userId: number, mentorId: number, status: StatusType): Promise<{
        message: string;
    }>;
}
