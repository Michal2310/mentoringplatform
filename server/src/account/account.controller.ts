import { Body, Controller, Get, Patch, Put } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetCurrentUserId } from '../common/decorators';
import { MentorDto } from '../mentors/dto';
import { AccountService } from './account.service';
import { ChangePasswordDto } from './dto';

@ApiBearerAuth()
@ApiTags('Account')
@Controller('myaccount')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Get('')
  getUserAccountDetails(@GetCurrentUserId() userId: number) {
    return this.accountService.getUserAccountDetails(userId);
  }
  @Put('update')
  updateUser(@GetCurrentUserId() userId: number, @Body() dto: MentorDto) {
    return this.accountService.updateUser(userId, dto);
  }

  @Put('')
  changePassword(@GetCurrentUserId() userId: number, @Body() dto: ChangePasswordDto) {
    return this.accountService.changePassword(userId, dto.oldPassword, dto.newPassword);
  }
  @Get('skills')
  getSkills(@GetCurrentUserId() userId: number) {
    return this.accountService.getSkills(userId);
  }
  @Get('languages')
  getLanguages(@GetCurrentUserId() userId: number) {
    return this.accountService.getLanguages(userId);
  }
  @Get('country')
  getCountry(@GetCurrentUserId() userId: number) {
    return this.accountService.getCountry(userId);
  }
}
