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
exports.AccountService = void 0;
const common_1 = require("@nestjs/common");
const ability_1 = require("@casl/ability");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const ability_factory_1 = require("../ability/ability.factory");
let AccountService = class AccountService {
    constructor(prisma, abilityFactory) {
        this.prisma = prisma;
        this.abilityFactory = abilityFactory;
    }
    async getUserAccountDetails(userId) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
                include: {
                    country: true,
                    languages: {
                        select: {
                            language: true,
                        },
                    },
                    skills: {
                        select: {
                            skill: true,
                        },
                    },
                    image: {
                        select: {
                            fileUrl: true,
                        },
                    },
                },
            });
            if (!user)
                throw new common_1.NotFoundException();
            delete user.password;
            delete user.refreshToken;
            delete user.verifyToken;
            return user;
        }
        catch (error) {
            throw error;
        }
    }
    async changePassword(userId, oldPassword, newPassword) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
            });
            const ability = this.abilityFactory.createForUser(user);
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Manage, user);
            const isPasswordsMatch = await argon.verify(user.password.toString(), oldPassword.toString());
            if (!isPasswordsMatch)
                throw new common_1.ForbiddenException();
            const hashedPassword = await argon.hash(newPassword);
            const updatedUser = await this.prisma.users.update({
                where: {
                    id: userId,
                },
                data: {
                    password: hashedPassword,
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async updateUser(userId, dto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: { id: userId },
                include: {
                    country: true,
                    skills: true,
                },
            });
            const ability = this.abilityFactory.createForUser(user);
            ability_1.ForbiddenError.from(ability).throwUnlessCan(ability_factory_1.Action.Manage, user);
            const updatedUser = await this.prisma.users.update({
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
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async getSkills(userId) {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.ForbiddenException();
            const skills = await this.prisma.skills.findMany();
            return skills;
        }
        catch (error) {
            throw error;
        }
    }
    async getLanguages(userId) {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.ForbiddenException();
            const languages = await this.prisma.languages.findMany();
            return languages;
        }
        catch (error) {
            throw error;
        }
    }
    async getCountry(userId) {
        try {
            const user = await this.prisma.users.findUnique({ where: { id: userId } });
            if (!user)
                throw new common_1.ForbiddenException();
            const countries = await this.prisma.countries.findMany();
            return countries;
        }
        catch (error) {
            throw error;
        }
    }
};
AccountService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, ability_factory_1.AbilityFactory])
], AccountService);
exports.AccountService = AccountService;
//# sourceMappingURL=account.service.js.map