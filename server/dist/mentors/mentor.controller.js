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
exports.MentorController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const types_1 = require("./types");
const dto_1 = require("./dto");
const mentor_service_1 = require("./mentor.service");
let MentorController = class MentorController {
    constructor(mentorService) {
        this.mentorService = mentorService;
    }
    getAllMentors(page) {
        return this.mentorService.getAllMentors(page);
    }
    getMentor(id) {
        return this.mentorService.getMentor(id);
    }
    addFavoriteMentor(userId, mentorId) {
        return this.mentorService.favoriteMentor(userId, mentorId);
    }
    sendMentorRequest(userId, dto) {
        return this.mentorService.sendMentorRequest(userId, dto);
    }
    verifyPendingMentorRequests(userId, mentorId, status) {
        return this.mentorService.verifyPendingMentorRequests(userId, mentorId, status);
    }
};
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)('mentors'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MentorController.prototype, "getAllMentors", null);
__decorate([
    (0, decorators_1.Public)(),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MentorController.prototype, "getMentor", null);
__decorate([
    (0, common_1.Post)('favoritementor/:mentorId'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('mentorId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MentorController.prototype, "addFavoriteMentor", null);
__decorate([
    (0, common_1.Post)(''),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.MentorDto]),
    __metadata("design:returntype", void 0)
], MentorController.prototype, "sendMentorRequest", null);
__decorate([
    (0, common_1.Post)(':id'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], MentorController.prototype, "verifyPendingMentorRequests", null);
MentorController = __decorate([
    (0, swagger_1.ApiTags)('Mentors'),
    (0, common_1.Controller)('mentor'),
    __metadata("design:paramtypes", [mentor_service_1.MentorService])
], MentorController);
exports.MentorController = MentorController;
//# sourceMappingURL=mentor.controller.js.map