import { PrismaService } from '../prisma/prisma.service';
import { GatewayDto } from './dto';
export declare class GatewayService {
    private prisma;
    constructor(prisma: PrismaService);
    getRoomMessages(userId: number, roomId: number): Promise<MethodDecorator | import(".prisma/client").Messages[]>;
    sendMessage(userId: number, roomId: number, dto: GatewayDto): Promise<void>;
    getAvaivableRooms(userId: number): Promise<import(".prisma/client").Rooms[]>;
}
