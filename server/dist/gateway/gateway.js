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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const jwt_1 = require("@nestjs/jwt");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const ws_1 = require("ws");
const account_service_1 = require("../account/account.service");
const dto_1 = require("./dto");
const gateway_service_1 = require("./gateway.service");
let ChatGateway = class ChatGateway {
    constructor(gatewayService, jwtService, accountService) {
        this.gatewayService = gatewayService;
        this.jwtService = jwtService;
        this.accountService = accountService;
    }
    handleDisconnect(socket) {
        return socket.disconnect();
    }
    async handleConnection(socket) {
        const jwt = socket.handshake.headers['authorization'].split(' ')[1];
        const { sub } = this.jwtService.decode(jwt);
        if (!sub)
            return this.handleDisconnect(socket);
        const user = await this.accountService.getUserAccountDetails(sub);
        const rooms = await this.gatewayService.getAvaivableRooms(sub);
        socket.data.user = user;
        socket.data.rooms = rooms;
    }
    async onJoinRoom(socket, roomId) {
        const messages = await this.gatewayService.getRoomMessages(socket.data.user.sub, roomId);
        socket.data.rooms.activeRoom = roomId;
        socket.join(roomId.toString());
        this.server.to(roomId.toString()).emit('messages', messages);
    }
    async onLeaveRoom(socket) {
        delete socket.data.rooms.activeRoom;
    }
    async onNewMessage(client, payload) {
        await this.gatewayService.sendMessage(client.data.user.sub, client.data.rooms.activeRoom, payload);
        this.server.to(payload.room).emit('sendMessage', payload.message);
    }
    callUser(client, data) {
        client.to(data.to).emit('call-made', {
            offer: data.offer,
            socket: client.id,
        });
    }
    makeAnswer(client, data) {
        client.to(data.to).emit('answer-made', {
            socket: client.id,
            answer: data.answer,
        });
    }
    rejectCall(client, data) {
        client.to(data.from).emit('call-rejected', {
            socket: client.id,
        });
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_a = typeof ws_1.Server !== "undefined" && ws_1.Server) === "function" ? _a : Object)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave-room'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('new-message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, dto_1.GatewayDto]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "onNewMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('call-user'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, dto_1.CallDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "callUser", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('make-answer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, dto_1.CallDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "makeAnswer", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('reject-call'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, dto_1.CallDto]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "rejectCall", null);
ChatGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [gateway_service_1.GatewayService,
        jwt_1.JwtService,
        account_service_1.AccountService])
], ChatGateway);
exports.ChatGateway = ChatGateway;
//# sourceMappingURL=gateway.js.map