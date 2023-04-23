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
exports.GatewayService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let GatewayService = class GatewayService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getRoomMessages(userId, roomId) {
        try {
            const room = await this.prisma.messages.findMany({
                where: {
                    roomId,
                    userId,
                },
            });
            if (!room)
                return (0, common_1.Redirect)('http://localhost:3001');
            return room;
        }
        catch (error) {
            throw error;
        }
    }
    async sendMessage(userId, roomId, dto) {
        try {
            await this.prisma.messages.create({
                data: {
                    message: dto.message,
                    userId,
                    roomId,
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getAvaivableRooms(userId) {
        try {
            return this.prisma.rooms.findMany({
                where: {
                    users: {
                        every: {
                            id: userId,
                        },
                    },
                },
            });
        }
        catch (error) {
            throw error;
        }
    }
};
GatewayService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GatewayService);
exports.GatewayService = GatewayService;
//# sourceMappingURL=gateway.service.js.map