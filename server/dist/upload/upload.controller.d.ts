/// <reference types="multer" />
import { UploadService } from './upload.service';
export declare class UploadController {
    private uploadService;
    constructor(uploadService: UploadService);
    uploadFile(file: Express.Multer.File, userId: number): Promise<import(".prisma/client").Images>;
    deletePhoto(userId: number): Promise<{
        message: string;
    }>;
}
