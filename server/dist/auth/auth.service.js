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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const runtime_1 = require("@prisma/client/runtime");
const crypto_1 = require("crypto");
const argon = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
const mail_templates_1 = require("../mail/mail.templates");
let AuthService = class AuthService {
    constructor(prisma, jwt, config, mailer, mailerTemplate) {
        this.prisma = prisma;
        this.jwt = jwt;
        this.config = config;
        this.mailer = mailer;
        this.mailerTemplate = mailerTemplate;
    }
    async register(dto) {
        try {
            const hashedPassword = await argon.hash(dto.password);
            const verificationToken = await this.generatateCode(5);
            const { id, email } = await this.prisma.users.create({
                data: {
                    email: dto.email,
                    password: hashedPassword,
                    verifyToken: verificationToken,
                },
            });
            const avatarUrl = generateAvatarUrl(email);
            const avatarName = (0, crypto_1.randomBytes)(8).toString('hex');
            await this.prisma.images.create({
                data: {
                    userId: id,
                    fileUrl: avatarUrl,
                    fileName: avatarName,
                    key: avatarName,
                },
            });
            const tokens = await this.getTokens(id, email);
            await this.updateRefreshToken(id, tokens.refresh_token);
            return tokens;
        }
        catch (error) {
            if (error instanceof runtime_1.PrismaClientKnownRequestError)
                if (error.code === 'P2002')
                    throw new common_1.ForbiddenException('Credentials taken');
            throw error;
        }
    }
    async login(dto) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email: dto.email,
                },
                select: {
                    id: true,
                    firstname: true,
                    lastname: true,
                    email: true,
                    password: true,
                    about: true,
                    title: true,
                    country: true,
                    languages: true,
                    skills: true,
                    image: true,
                    isMentor: true,
                },
            });
            if (!user)
                throw new common_1.ForbiddenException('Access denied');
            const passwordMatch = await argon.verify(user.password, dto.password);
            if (!passwordMatch)
                throw new common_1.ForbiddenException('Access denied');
            const tokens = await this.getTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refresh_token);
            delete user.password;
            return { tokens, user };
        }
        catch (error) {
            if (error instanceof common_1.ForbiddenException)
                throw new common_1.ForbiddenException('Email or password is incorrect');
            throw error;
        }
    }
    async logout(userId) {
        try {
            return await this.prisma.users.updateMany({
                where: {
                    id: userId,
                    refreshToken: {
                        not: null,
                    },
                },
                data: {
                    refreshToken: null,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async sendRecoveryLink(email) {
        try {
            const code = await this.generatateCode(6);
            const user = await this.prisma.users.findUnique({
                where: { email },
            });
            if (!user)
                throw new common_1.ForbiddenException();
            const updatedUser = await this.prisma.users.update({
                where: { email },
                data: {
                    recoveryCode: code,
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async updatePassword(code, email, password) {
        try {
            const user = await this.prisma.users.findUnique({ where: { email } });
            if (!user || user.recoveryCode.toString() !== code.toString())
                throw new common_1.ForbiddenException();
            const newPassword = await argon.hash(password);
            const updatedUser = await this.prisma.users.update({
                where: { email },
                data: {
                    password: newPassword,
                    recoveryCode: '',
                },
            });
            return updatedUser;
        }
        catch (error) {
            throw error;
        }
    }
    async refresh(userId, rt) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    id: userId,
                },
            });
            if (!user || user.refreshToken)
                throw new common_1.ForbiddenException('Acccess denied');
            const refreshTokenMatch = await argon.verify(user.refreshToken, rt);
            if (!refreshTokenMatch)
                throw new common_1.ForbiddenException('Acccess denied');
            const tokens = await this.getTokens(user.id, user.email);
            await this.updateRefreshToken(user.id, tokens.refresh_token);
            return tokens;
        }
        catch (error) {
            throw error;
        }
    }
    async verificationToken(verificationToken, email) {
        try {
            const user = await this.prisma.users.findUnique({
                where: {
                    email,
                },
            });
            if (!user)
                return null;
            if (user.verifyToken == verificationToken) {
                (0, common_1.Redirect)(`http://localhost:${this.config.get('PORT')}/`, 200);
                return await this.prisma.users.update({
                    where: {
                        email,
                    },
                    data: {
                        isVerified: true,
                    },
                });
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }
    async getTokens(userId, email) {
        const secret = this.config.get('JWT_SECRET');
        const refresh = this.config.get('JWT_REFRESH');
        const [accessToken, refreshToken] = await Promise.all([
            this.jwt.signAsync({ sub: userId, email }, { secret, expiresIn: 60 * 60 * 60 }),
            this.jwt.signAsync({ sub: userId, email }, { secret: refresh, expiresIn: 60 * 60 * 24 * 7 }),
        ]);
        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }
    async updateRefreshToken(userId, rt) {
        const hashedRefreshToken = await argon.hash(rt);
        await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken: hashedRefreshToken,
            },
        });
    }
    async generatateCode(bytes) {
        return (0, crypto_1.randomBytes)(bytes).toString('hex');
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService,
        mail_templates_1.MailerTemplate])
], AuthService);
exports.AuthService = AuthService;
const generateAvatarUrl = (emailAddress) => {
    const emailHash = (0, crypto_1.createHash)('md5').update(emailAddress).digest('hex');
    return `https://www.gravatar.com/avatar/${emailHash}?d=identicon`;
};
//# sourceMappingURL=auth.service.js.map