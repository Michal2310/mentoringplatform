"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentorService = void 0;
const mentor_stub_1 = require("../test/stubs/mentor.stub");
exports.MentorService = jest.fn().mockReturnValue({
    getAllMentors: jest.fn().mockResolvedValue(mentor_stub_1.getMentorsStub),
    getMentor: jest.fn().mockResolvedValue(mentor_stub_1.getMentorStub),
    sendMentorRequest: jest.fn().mockResolvedValue(mentor_stub_1.sendMentorRequestStub),
});
//# sourceMappingURL=mentor.service.js.map