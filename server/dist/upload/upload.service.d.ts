/// <reference types="node" />
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';
import { Images } from '@prisma/client';
export declare class UploadService {
    private prisma;
    private config;
    constructor(prisma: PrismaService, config: ConfigService);
    private uploadToS3;
    private deleteFromS3;
    uploadFile(dataBuffer: Buffer, fileName: string, userId: number): Promise<Images>;
    deletePhoto(userId: number): Promise<{
        message: string;
    }>;
}
