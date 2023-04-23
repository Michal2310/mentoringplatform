import { Users } from '@prisma/client';
import { AccountExtendedInfo } from '../../types';

const date = new Date();

export const getUserAccountStub = (): AccountExtendedInfo => {
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

export const changePasswordAccountStub = (): Users => {
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
