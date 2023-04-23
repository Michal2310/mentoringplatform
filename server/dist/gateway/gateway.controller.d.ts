import { GatewayDto } from './dto';
import { GatewayService } from './gateway.service';
export declare class GatewayController {
    private gatewayService;
    constructor(gatewayService: GatewayService);
    getMessages(userId: number, roomId: number): Promise<MethodDecorator | import(".prisma/client").Messages[]>;
    sendMessage(userId: number, roomId: number, dto: GatewayDto): Promise<void>;
}
