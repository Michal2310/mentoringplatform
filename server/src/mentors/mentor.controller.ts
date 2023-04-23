import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId, Public } from '../common/decorators';
import { StatusType } from './types';
import { MentorDto } from './dto';
import { MentorService } from './mentor.service';

@ApiTags('Mentors')
@Controller('mentor')
export class MentorController {
  constructor(private mentorService: MentorService) {}

  @Public()
  @Get('mentors')
  getAllMentors(@Query('page', ParseIntPipe) page?: number) {
    return this.mentorService.getAllMentors(page);
  }

  @Public()
  @Get(':id')
  getMentor(@Param('id', ParseIntPipe) id: number) {
    return this.mentorService.getMentor(id);
  }

  @Post('favoritementor/:mentorId')
  addFavoriteMentor(
    @GetCurrentUserId() userId: number,
    @Param('mentorId', ParseIntPipe) mentorId: number,
  ) {
    return this.mentorService.favoriteMentor(userId, mentorId);
  }
  @Post('')
  sendMentorRequest(@GetCurrentUserId() userId: number, @Body() dto: MentorDto) {
    return this.mentorService.sendMentorRequest(userId, dto);
  }

  @Post(':id')
  verifyPendingMentorRequests(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) mentorId: number,
    @Query('status') status: StatusType,
  ) {
    return this.mentorService.verifyPendingMentorRequests(userId, mentorId, status);
  }
}
