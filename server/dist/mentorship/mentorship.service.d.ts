import { Mentorships } from '@prisma/client';
import { StatusType } from './types';
import { MailService } from '../mail/mail.service';
import { MailerTemplate } from '../mail/mail.templates';
import { PrismaService } from '../prisma/prisma.service';
import { MentorshipDto } from './dto';
export declare class MentorshipService {
    private prisma;
    private mailer;
    private mailerTemplate;
    constructor(prisma: PrismaService, mailer: MailService, mailerTemplate: MailerTemplate);
    private sendEmail;
    sendMentorshipRequest(userId: number, mentorId: number, dto: MentorshipDto): Promise<Mentorships>;
    getUserMentorshipsRequests(userId: number, limit: string): Promise<Mentorships[]>;
    getReceivedMentorshipsRequests(userId: number, limit: string): Promise<(Mentorships & {
        user: {
            email: string;
        };
    })[]>;
    private updateMentorship;
    verifyPendingMentorships(mentorId: number, requestId: number, mentorshipStatus: StatusType): Promise<Mentorships>;
}
