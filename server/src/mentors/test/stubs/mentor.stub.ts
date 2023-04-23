import { BecomeMentorExtendedInfo, MentorExtendedInfo, MentorInfo } from '../../types';

const date = new Date(10, 10, 2022);

export const getMentorsStub = (): MentorExtendedInfo[] => {
  return [
    {
      id: 1,
      status: 'Accepted',
      userId: 1,
      views: 10,
      user: {
        firstname: 'jan',
        lastname: 'kowalski',
        about: 'jestem janek',
        title: 'Software developer',
        languages: [{ language: 'polish', id: 1 }],
        skills: [{ skill: 'skill1', id: 1 }],
        image: [{ fileUrl: 'url.com' }],
      },
    },
  ];
};

export const getMentorStub = (): MentorInfo[] => {
  return [
    {
      id: 1,
      firstname: 'jan',
      lastname: 'kowalski',
      email: 'email@host.com',
      about: 'jestem janek',
      title: 'Software developer',
      languages: [{ language: 'polish', id: 1 }],
      skills: [{ skill: 'skill1', id: 1 }],
      image: [{ fileUrl: 'url.com' }],
    },
  ];
};

export const sendMentorRequestStub = (): BecomeMentorExtendedInfo => {
  return {
    id: 1,
    firstname: 'jan',
    lastname: 'kowalski',
    email: 'janek@wp.pl',
    about: 'jestem janek',
    role: 'User',
    isMentor: false,
    isVerified: false,
    recoveryCode: '123',
    title: 'Software developer',
    refreshToken: 'hawdhbdjadh231ubhjbyu6FBU87V',
    password: 'best password',
    verifyToken: '236dw82',
    becameMentor: date,
    languages: [{ language: 'polish', id: 1 }],
    skills: [{ skill: 'supermocny', id: 1 }],
    country: [{ id: 1, country: 'poland' }],
  };
};
