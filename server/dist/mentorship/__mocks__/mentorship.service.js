"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorshipService = void 0;
const mentorship_stub_1 = require("../test/stubs/mentorship.stub");
exports.MentorshipService = jest.fn().mockReturnValue({
    sendMentorshipRequest: jest.fn().mockResolvedValue(mentorship_stub_1.sendMentorshipRequestStub),
    getUserMentorshipsRequests: jest.fn().mockResolvedValue(mentorship_stub_1.getUserMentorshipsRequestsStub),
    getReceivedMentorshipsRequests: jest
        .fn()
        .mockResolvedValue(mentorship_stub_1.getReceivedMentorshipsRequestsStub),
    verifyPendingMentorships: jest.fn().mockResolvedValue(mentorship_stub_1.verifyPendingMentorshipsStub),
});
//# sourceMappingURL=mentorship.service.js.map