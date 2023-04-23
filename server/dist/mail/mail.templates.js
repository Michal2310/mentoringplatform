"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerTemplate = void 0;
class MailerTemplate {
    constructor(config) {
        this.config = config;
    }
    verification(verificationToken, userEmail) {
        return {
            subject: '',
            text: '',
            html: `verify your email: http://localhost:3001/auth/verificationToken?verificationToken=${verificationToken}&email=${userEmail}`,
        };
    }
    recoveryPassword(code, userEmail) {
        return {
            subject: '',
            text: '',
            html: `verify your email: http://localhost:5174/recovery?code=${code}&email=${userEmail}`,
        };
    }
    mentorshipStatus() {
        return {
            subject: '',
            text: '',
            html: '',
        };
    }
    mentorStatus() {
        return {
            subject: '',
            text: '',
            html: '',
        };
    }
}
exports.MailerTemplate = MailerTemplate;
//# sourceMappingURL=mail.templates.js.map