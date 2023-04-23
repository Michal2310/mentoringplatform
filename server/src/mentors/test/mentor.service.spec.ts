import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { MentorService } from '../mentor.service';

describe('MentorService', () => {
  let mentorService: MentorService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        MentorService,
        {
          provide: PrismaService,
          useValue: {
            mentors: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    mentorService = moduleRef.get<MentorService>(MentorService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getAllMentors', () => {
    it('should return all accepted mentors', async () => {
      const mockMentors = [
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

      jest.spyOn(prismaService.mentors, 'findMany').mockResolvedValue(mockMentors);

      const result = await mentorService.getAllMentors(1);

      expect(prismaService.mentors.findMany).toHaveBeenCalledWith({
        skip: 0,
        take: 20,
        where: { status: 'Accepted' },
        include: {
          user: { select: mentorService.getUserFields() },
        },
      });
      expect(result).toEqual(mockMentors);
    });

    it('should throw a NotFoundException when no mentors are found', async () => {
      jest.spyOn(prismaService.mentors, 'findMany').mockResolvedValue([]);

      expect(mentorService.getAllMentors(1)).rejects.toThrowError(NotFoundException);
    });
  });
});
