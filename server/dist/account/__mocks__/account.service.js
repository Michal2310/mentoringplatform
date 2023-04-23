"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const account_stub_1 = require("../test/stubs/account.stub");
exports.AccountService = jest.fn().mockReturnValue({
    getUserAccountDetails: jest.fn().mockResolvedValue((0, account_stub_1.getUserAccountStub)()),
    changePassword: jest.fn().mockResolvedValue((0, account_stub_1.changePasswordAccountStub)()),
});
//# sourceMappingURL=account.service.js.map