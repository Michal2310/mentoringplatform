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
exports.AccountController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const decorators_1 = require("../common/decorators");
const dto_1 = require("../mentors/dto");
const account_service_1 = require("./account.service");
const dto_2 = require("./dto");
let AccountController = class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
    }
    getUserAccountDetails(userId) {
        return this.accountService.getUserAccountDetails(userId);
    }
    updateUser(userId, dto) {
        return this.accountService.updateUser(userId, dto);
    }
    changePassword(userId, dto) {
        return this.accountService.changePassword(userId, dto.oldPassword, dto.newPassword);
    }
    getSkills(userId) {
        return this.accountService.getSkills(userId);
    }
    getLanguages(userId) {
        return this.accountService.getLanguages(userId);
    }
    getCountry(userId) {
        return this.accountService.getCountry(userId);
    }
};
__decorate([
    (0, common_1.Get)(''),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getUserAccountDetails", null);
__decorate([
    (0, common_1.Put)('update'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_1.MentorDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Put)(''),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, dto_2.ChangePasswordDto]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Get)('skills'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getSkills", null);
__decorate([
    (0, common_1.Get)('languages'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getLanguages", null);
__decorate([
    (0, common_1.Get)('country'),
    __param(0, (0, decorators_1.GetCurrentUserId)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AccountController.prototype, "getCountry", null);
AccountController = __decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Account'),
    (0, common_1.Controller)('myaccount'),
    __metadata("design:paramtypes", [account_service_1.AccountService])
], AccountController);
exports.AccountController = AccountController;
//# sourceMappingURL=account.controller.js.map