import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
export declare class MailService {
    private readonly mailerService;
    private config;
    constructor(mailerService: MailerService, config: ConfigService);
    sendMail(userEmail: string, template: {
        subject: string;
        text: string;
        html: string;
    }): Promise<void>;
}
