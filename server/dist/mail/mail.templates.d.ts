import { ConfigService } from '@nestjs/config';
export declare class MailerTemplate {
    private config;
    constructor(config: ConfigService);
    verification(verificationToken: string, userEmail: string): {
        subject: string;
        text: string;
        html: string;
    };
    recoveryPassword(code: string, userEmail: string): {
        subject: string;
        text: string;
        html: string;
    };
    mentorshipStatus(): {
        subject: string;
        text: string;
        html: string;
    };
    mentorStatus(): {
        subject: string;
        text: string;
        html: string;
    };
}
