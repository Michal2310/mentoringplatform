import { LoginDto, RecoveryDto, RegisterDto } from './dto';
import { Tokens } from './types';
import { AuthService } from './auth.service';
export declare class AuthController {
    private userService;
    constructor(userService: AuthService);
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
    refreshToken(userId: number, refreshToken: string): Promise<Tokens>;
    verificationToken(verificationToken: string, email: string): Promise<import(".prisma/client").Users>;
    recoveryLink(email: string): Promise<import(".prisma/client").Users>;
    updatePassword({ email, password }: RecoveryDto, code: string): Promise<import(".prisma/client").Users>;
}
