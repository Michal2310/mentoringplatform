"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordAccountStub = exports.getUserAccountStub = void 0;
const date = new Date();
const getUserAccountStub = () => {
    return {
        id: 1,
        firstname: 'jan',
        lastname: 'kowalski',
        email: 'janek@wp.pl',
        about: 'jestem janek',
        role: 'User',
        recoveryCode: '123',
        isMentor: false,
        isVerified: false,
        title: 'Software developer',
        refreshToken: 'hawdhbdjadh231ubhjbyu6FBU87V',
        password: 'best password',
        verifyToken: '236dw82',
        becameMentor: date,
        languages: [{ language: 'polish' }],
        skills: [{ skill: 'supermocny' }],
        image: [{ fileUrl: 'url.com' }],
        country: [
            {
                id: 1,
                country: 'poland',
            },
        ],
    };
};
exports.getUserAccountStub = getUserAccountStub;
const changePasswordAccountStub = () => {
    return {
        id: 1,
        firstname: 'jan',
        lastname: 'kowalski',
        email: 'janek@wp.pl',
        about: 'jestem janek',
        recoveryCode: '123',
        role: 'User',
        isMentor: false,
        isVerified: false,
        title: 'Software developer',
        refreshToken: 'hawdhbdjadh231ubhjbyu6FBU87V',
        password: 'changed best password',
        verifyToken: '236dw82',
        becameMentor: date,
    };
};
exports.changePasswordAccountStub = changePasswordAccountStub;
//# sourceMappingURL=account.stub.js.map