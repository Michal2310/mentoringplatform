"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorshipService = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../mail/mail.service");
const mail_templates_1 = require("../mail/mail.templates");
const prisma_service_1 = require("../prisma/prisma.service");
let MentorshipService = class MentorshipService {
    constructor(prisma, mailer, mailerTemplate) {
        this.prisma = prisma;
        this.mailer = mailer;
        this.mailerTemplate = mailerTemplate;
    }
    async sendEmail(email) {
        return await this.mailer.sendMail(email, this.mailerTemplate.mentorshipStatus());
    }
    async sendMentorshipRequest(userId, mentorId, dto) {
        try {
            const mentor = await this.prisma.mentors.findFirst({
                where: {
                    user: {
                        id: mentorId,
                    },
                    status: 'Accepted',
                },
            });
            if (!mentor)
                throw new common_1.NotFoundException();
            const latestUserMentorshipRequest = await this.prisma.mentorships.findFirst({
                where: {
                    senderId: userId,
                    mentorId: mentor.id,
                },
                orderBy: {
                    createdAt: 'desc',
                },
            });
            if (latestUserMentorshipRequest) {
                const daysSinceLastRequest = (new Date().getTime() - new Date(latestUserMentorshipRequest.createdAt).getTime()) /
                    (1000 * 60 * 60 * 24);
                if (daysSinceLastRequest < 5) {
                    throw new common_1.ConflictException('You cannot send a request more than once every 5 days');
                }
            }
            const mentorshipRequest = await this.prisma.mentorships.create({
                data: {
                    senderId: userId,
                    mentorId: mentor.id,
                    background: dto.background,
                    expectations: dto.expectations,
                    message: dto.message,
                },
            });
            return mentorshipRequest;
        }
        catch (error) {
            throw error;
        }
    }
    async getUserMentorshipsRequests(userId, limit) {
        try {
            const mentorships = await this.prisma.mentorships.findMany({
                where: {
                    senderId: userId,
                },
                include: {
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
                take: Number(limit),
            });
            return mentorships;
        }
        catch (error) {
            throw error;
        }
    }
    async getReceivedMentorshipsRequests(userId, limit) {
        try {
            const receivedMentorshipsRequests = await this.prisma.mentorships.findMany({
                where: {
                    mentor: {
                        userId,
                        status: 'Accepted',
                    },
                },
                include: {
                    user: {
                        select: {
                            email: true,
                        },
                    },
                },
                take: Number(limit),
            });
            return receivedMentorshipsRequests;
        }
        catch (error) {
            throw error;
        }
    }
    async updateMentorship(prisma, requestId, data) {
        try {
            const mentorship = await prisma.mentorships.update({
                where: { id: requestId },
                data,
            });
            return mentorship;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyPendingMentorships(mentorId, requestId, mentorshipStatus) {
        try {
            const { senderId } = await this.prisma.mentorships.findUnique({
                where: {
                    id: requestId,
                },
                select: {
                    senderId: true,
                },
            });
            if (!senderId)
                throw new common_1.ConflictException();
            const updatedMentorship = await this.updateMentorship(this.prisma, requestId, {
                status: mentorshipStatus,
            });
            if (updatedMentorship.status === 'Accepted') {
                await this.prisma.rooms.create({
                    data: {
                        users: {
                            connect: [
                                {
                                    id: mentorId,
                                },
                                {
                                    id: senderId,
                                },
                            ],
                        },
                    },
                });
            }
            return updatedMentorship;
        }
        catch (error) {
            throw error;
        }
    }
};
MentorshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService,
        mail_templates_1.MailerTemplate])
], MentorshipService);
exports.MentorshipService = MentorshipService;
//# sourceMappingURL=mentorship.service.js.map