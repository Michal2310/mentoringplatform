import { MentorDto } from '../mentors/dto';
import { AccountService } from './account.service';
import { ChangePasswordDto } from './dto';
export declare class AccountController {
    private accountService;
    constructor(accountService: AccountService);
    getUserAccountDetails(userId: number): Promise<import(".prisma/client").Users>;
    updateUser(userId: number, dto: MentorDto): Promise<import(".prisma/client").Users>;
    changePassword(userId: number, dto: ChangePasswordDto): Promise<import(".prisma/client").Users>;
    getSkills(userId: number): Promise<import(".prisma/client").Skills[]>;
    getLanguages(userId: number): Promise<import(".prisma/client").Languages[]>;
    getCountry(userId: number): Promise<import(".prisma/client").Countries[]>;
}
