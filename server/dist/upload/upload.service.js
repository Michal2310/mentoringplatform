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
exports.UploadService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const config_1 = require("@nestjs/config");
const crypto_1 = require("crypto");
const aws_sdk_1 = require("aws-sdk");
let UploadService = class UploadService {
    constructor(prisma, config) {
        this.prisma = prisma;
        this.config = config;
    }
    async uploadToS3(dataBuffer, fileName) {
        const s3 = new aws_sdk_1.S3();
        const random = (0, crypto_1.randomBytes)(8).toString('hex');
        return await s3
            .upload({
            Bucket: this.config.get('AWS_BUCKET_NAME'),
            Body: dataBuffer,
            Key: `${random}-${fileName}`,
            ACL: 'public-read',
        })
            .promise();
    }
    async deleteFromS3(key) {
        const s3 = new aws_sdk_1.S3();
        return await s3
            .deleteObject({
            Bucket: this.config.get('AWS_BUCKET_NAME'),
            Key: key,
        })
            .promise();
    }
    async uploadFile(dataBuffer, fileName, userId) {
        try {
            const uploadResult = await this.uploadToS3(dataBuffer, fileName);
            const imageExists = await this.prisma.images.findUnique({
                where: { userId },
            });
            if (imageExists) {
                await this.deleteFromS3(imageExists.key);
                return this.prisma.images.update({
                    where: {
                        userId,
                    },
                    data: {
                        fileName: fileName,
                        fileUrl: uploadResult.Location,
                        key: uploadResult.Key,
                    },
                });
            }
            return await this.prisma.images.create({
                data: {
                    fileName: fileName,
                    fileUrl: uploadResult.Location,
                    key: uploadResult.Key,
                    userId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async deletePhoto(userId) {
        try {
            const { key } = await this.prisma.images.findUnique({
                where: { userId },
                select: { key: true },
            });
            await this.deleteFromS3(key);
            await this.prisma.images.delete({ where: { userId } });
            return { message: 'Image deleted' };
        }
        catch (error) {
            throw error;
        }
    }
};
UploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, config_1.ConfigService])
], UploadService);
exports.UploadService = UploadService;
//# sourceMappingURL=upload.service.js.map