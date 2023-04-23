import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Server } from 'ws';
import { AccountService } from '../account/account.service';
import { CallDto, GatewayDto } from './dto';
import { GatewayService } from './gateway.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private gatewayService;
    private jwtService;
    private accountService;
    constructor(gatewayService: GatewayService, jwtService: JwtService, accountService: AccountService);
    server: Server;
    handleDisconnect(socket: Socket): Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>;
    handleConnection(socket: Socket): Promise<Socket<import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, import("socket.io/dist/typed-events").DefaultEventsMap, any>>;
    onJoinRoom(socket: Socket, roomId: number): Promise<void>;
    onLeaveRoom(socket: Socket): Promise<void>;
    onNewMessage(client: Socket, payload: GatewayDto): Promise<void>;
    callUser(client: Socket, data: CallDto): void;
    makeAnswer(client: Socket, data: CallDto): void;
    rejectCall(client: Socket, data: CallDto): void;
}
