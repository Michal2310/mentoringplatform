import { StatusType } from './types';
import { MentorDto } from './dto';
import { MentorService } from './mentor.service';
export declare class MentorController {
    private mentorService;
    constructor(mentorService: MentorService);
    getAllMentors(page?: number): Promise<import(".prisma/client").Mentors[]>;
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
    addFavoriteMentor(userId: number, mentorId: number): Promise<import(".prisma/client").Prisma.BatchPayload | import(".prisma/client").FavoriteMentors>;
    sendMentorRequest(userId: number, dto: MentorDto): Promise<import("@nestjs/common").NotFoundException | import("@nestjs/common").ConflictException | {
        message: string;
    }>;
    verifyPendingMentorRequests(userId: number, mentorId: number, status: StatusType): Promise<{
        message: string;
    }>;
}
