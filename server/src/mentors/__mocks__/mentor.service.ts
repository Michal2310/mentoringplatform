import {
  getMentorStub,
  getMentorsStub,
  sendMentorRequestStub,
} from '../test/stubs/mentor.stub';

export const MentorService = jest.fn().mockReturnValue({
  getAllMentors: jest.fn().mockResolvedValue(getMentorsStub),
  getMentor: jest.fn().mockResolvedValue(getMentorStub),
  sendMentorRequest: jest.fn().mockResolvedValue(sendMentorRequestStub),
  //verifyPendingMentor: jest.fn().mockResolvedValue(),
});

// tak było gdyby controller przestał działać
// export const MentorService = jest.fn().mockReturnValue({
//   getAllMentors: jest.fn().mockResolvedValue(getMentorsStub),
//   getMentor: jest.fn().mockResolvedValue(getMentorStub),
//   sendMentorRequest: jest.fn().mockResolvedValue(sendMentorRequestStub),
//   //verifyPendingMentor: jest.fn().mockResolvedValue(),
// });
