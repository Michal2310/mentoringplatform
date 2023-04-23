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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorshipController = void 0;
const common_1 = require("@nestjs/common");
const decorators_1 = require("../common/decorators");
const types_1 = require("./types");
const dto_1 = require("./dto");
const mentorship_service_1 = require("./mentorship.service");
const swagger_1 = require("@nestjs/swagger");
let MentorshipController = class MentorshipController {
    constructor(mentorshipService) {
        this.mentorshipService = mentorshipService;
    }
    sendMentorshipRequest(userId, mentorId, dto) {
        return this.mentorshipService.sendMentorshipRequest(userId, mentorId, dto);
    }
    getUserMentorshipsRequests(userId, limit) {
        return this.mentorshipService.getUserMentorshipsRequests(userId, limit);
    }
    getReceivedMentorshipsRequests(userId, limit) {
        return this.mentorshipService.getReceivedMentorshipsRequests(userId, limit);
    }
    verifyPendingMentorships(userId, requestId, status) {
        return this.mentorshipService.verifyPendingMentorships(userId, requestId, status);
    }
};
__decorate([
    (0, common_1.Post)('/:mentorId'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('mentorId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, dto_1.MentorshipDto]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "sendMentorshipRequest", null);
__decorate([
    (0, common_1.Get)('/myrequests'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "getUserMentorshipsRequests", null);
__decorate([
    (0, common_1.Get)('/receivedRequests'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "getReceivedMentorshipsRequests", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MentorshipController.prototype, "verifyPendingMentorships", null);
MentorshipController = __decorate([
    (0, swagger_1.ApiTags)('Mentorships'),
    (0, common_1.Controller)('mentorship'),
    __metadata("design:paramtypes", [mentorship_service_1.MentorshipService])
], MentorshipController);
exports.MentorshipController = MentorshipController;
//# sourceMappingURL=mentorship.controller.js.map