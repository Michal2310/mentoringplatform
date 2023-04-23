import { Users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AbilityFactory } from '../ability/ability.factory';
import { MentorDto } from '../mentors/dto';
export declare class AccountService {
    private prisma;
    private abilityFactory;
    constructor(prisma: PrismaService, abilityFactory: AbilityFactory);
    getUserAccountDetails(userId: number): Promise<Users>;
    changePassword(userId: number, oldPassword: string, newPassword: string): Promise<Users>;
    updateUser(userId: number, dto: MentorDto): Promise<Users>;
    getSkills(userId: number): Promise<import(".prisma/client").Skills[]>;
    getLanguages(userId: number): Promise<import(".prisma/client").Languages[]>;
    getCountry(userId: number): Promise<import(".prisma/client").Countries[]>;
}
