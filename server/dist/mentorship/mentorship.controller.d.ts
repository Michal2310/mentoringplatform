import { StatusType } from './types';
import { MentorshipDto } from './dto';
import { MentorshipService } from './mentorship.service';
export declare class MentorshipController {
    private mentorshipService;
    constructor(mentorshipService: MentorshipService);
    sendMentorshipRequest(userId: number, mentorId: number, dto: MentorshipDto): Promise<import(".prisma/client").Mentorships>;
    getUserMentorshipsRequests(userId: number, limit: string): Promise<import(".prisma/client").Mentorships[]>;
    getReceivedMentorshipsRequests(userId: number, limit: string): Promise<(import(".prisma/client").Mentorships & {
        user: {
            email: string;
        };
    })[]>;
    verifyPendingMentorships(userId: number, requestId: number, status: StatusType): Promise<import(".prisma/client").Mentorships>;
}
