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
exports.MentorService = void 0;
const ability_1 = require("@casl/ability");
const common_1 = require("@nestjs/common");
const runtime_1 = require("@prisma/client/runtime");
const ability_factory_1 = require("../ability/ability.factory");
const types_1 = require("./types");
const mail_service_1 = require("../mail/mail.service");
const mail_templates_1 = require("../mail/mail.templates");
const prisma_service_1 = require("../prisma/prisma.service");
let MentorService = class MentorService {
    constructor(prisma, abilityFactory, mailer, mailerTemplate) {
        this.prisma = prisma;
        this.abilityFactory = abilityFactory;
        this.mailer = mailer;
        this.mailerTemplate = mailerTemplate;
    }
    getUserFields() {
        return {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            title: true,
            about: true,
            country: true,
            skills: true,
            languages: true,
            image: {
                select: { fileUrl: true },
            },
        };
    }
    async getAllMentors(page) {
        try {
            const skip = 20 * (page - 1);
            const mentors = await this.prisma.mentors.findMany({
                skip,
                take: 20,
                where: { status: 'Accepted' },
                include: {
                    user: { select: this.getUserFields() },
                    favoriteMentors: true,
                },
            });
            if (mentors.length <= 0)
                throw new common_1.NotFoundException('');
            return mentors;
        }
        catch (error) {
            throw error;
        }
    }
    async getMentor(id) {
        try {
            const mentor = await this.prisma.users.findFirst({
                where: {
                    id,
                },
                select: this.getUserFields(),
            });
            if (!mentor)
                throw new common_1.NotFoundException('Mentor not found!');
            await this.prisma.mentors.update({
                where: { userId: id },
                data: {
                    views: {
                        increment: 1,
                    },
                },
            });
            return mentor;
        }
        catch (error) {
            throw error;
        }
    }
    async sendMentorRequest(userId, dto) {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: userId } });
            if (!user)
                return new common_1.NotFoundException();
            const existingMentor = await this.prisma.mentors.findFirst({ where: { userId } });
            if (existingMentor)
                return new common_1.ConflictException();
            const updatedUser = this.prisma.users.update({
                where: { id: userId },
                data: {
                    firstname: dto.firstname,
                    lastname: dto.lastname,
                    title: dto.title,
                    about: dto.about,
                    skills: {
                        set: dto.skills.map((skill) => {
                            return { skill };
                        }),
                    },
                    languages: {
                        set: dto.languages.map((language) => {
                            return { language };
                        }),
                    },
                    country: {
                        set: {
                            country: dto.country,
                        },
                    },
                },
            });
            const mentor = this.prisma.mentors.create({ data: { userId } });
            await this.prisma.$transaction([updatedUser, mentor]);
            return { message: 'Mentor request sent!' };
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError)
                if (error.code === 'P2025') {
                    throw new common_1.BadRequestException();
                }
            throw error;
        }
    }
    async favoriteMentor(userId, mentorId) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            const mentor = await this.prisma.mentors.findUnique({ where: { userId: mentorId } });
            if (!user || !mentor)
                throw new common_1.ForbiddenException();
            const existingFavoriteMentor = await this.prisma.favoriteMentors.findFirst({
                where: {
                    mentor: {
                        userId: mentorId,
                    },
                    user: {
                        id: userId,
                    },
                },
            });
            if (existingFavoriteMentor) {
                return await this.prisma.favoriteMentors.deleteMany({
                    where: {
                        mentor: {
                            userId: mentorId,
                        },
                        user: {
                            id: userId,
                        },
                    },
                });
            }
            const addFavoriteMentor = await this.prisma.favoriteMentors.create({
                data: {
                    mentor: {
                        connect: {
                            userId: mentorId,
                        },
                    },
                    user: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
            return addFavoriteMentor;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyPendingMentorRequests(userId, mentorId, status) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            const ability = this.abilityFactory.createForUser(user);
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Update, user);
            const updatedUser = this.prisma.users.update({
                where: { id: mentorId },
                data: { isMentor: status === types_1.StatusType.Accepted ? true : false },
            });
            const mentor = this.prisma.mentors.update({
                where: { id: mentorId },
                data: {
                    status: { set: status },
                },
            });
            await this.mailer.sendMail(user.email, this.mailerTemplate.mentorStatus());
            await this.prisma.$transaction([updatedUser, mentor]);
            return { message: 'User and mentor updated' };
        }
        catch (error) {
            if (error instanceof ability_1.ForbiddenError)
                throw new common_1.UnauthorizedException();
            throw error;
        }
    }
};
MentorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        ability_factory_1.AbilityFactory,
        mail_service_1.MailService,
        mail_templates_1.MailerTemplate])
], MentorService);
exports.MentorService = MentorService;
//# sourceMappingURL=mentor.service.js.map