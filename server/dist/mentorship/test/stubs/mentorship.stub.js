"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPendingMentorshipsStub = exports.getReceivedMentorshipsRequestsStub = exports.getUserMentorshipsRequestsStub = exports.sendMentorshipRequestStub = void 0;
const date = new Date();
const sendMentorshipRequestStub = () => {
    return {
        id: 10,
        background: 'background',
        expectations: 'expectations',
        message: 'message',
        status: 'Accepted',
        senderId: 2,
        mentorId: 1,
        createdAt: date,
    };
};
exports.sendMentorshipRequestStub = sendMentorshipRequestStub;
const getUserMentorshipsRequestsStub = () => {
    return [
        {
            id: 10,
            background: 'background',
            expectations: 'expectations',
            message: 'message',
            status: 'Accepted',
            senderId: 2,
            mentorId: 1,
            createdAt: date,
        },
        {
            id: 11,
            background: 'background',
            expectations: 'expectations',
            message: 'message',
            status: 'Accepted',
            senderId: 2,
            mentorId: 3,
            createdAt: date,
        },
    ];
};
exports.getUserMentorshipsRequestsStub = getUserMentorshipsRequestsStub;
const getReceivedMentorshipsRequestsStub = () => {
    return [
        {
            id: 10,
            background: 'background',
            expectations: 'expectations',
            message: 'message',
            status: 'Pending',
            senderId: 2,
            mentorId: 6,
            createdAt: date,
        },
        {
            id: 11,
            background: 'background',
            expectations: 'expectations',
            message: 'message',
            status: 'Pending',
            senderId: 2,
            mentorId: 6,
            createdAt: date,
        },
    ];
};
exports.getReceivedMentorshipsRequestsStub = getReceivedMentorshipsRequestsStub;
const verifyPendingMentorshipsStub = () => {
    return {
        id: 12,
        background: 'background',
        expectations: 'expectations',
        message: 'message',
        status: 'Pending',
        senderId: 3,
        mentorId: 7,
        createdAt: date,
    };
};
exports.verifyPendingMentorshipsStub = verifyPendingMentorshipsStub;
//# sourceMappingURL=mentorship.stub.js.map