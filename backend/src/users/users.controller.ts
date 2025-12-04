import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  UseGuards,
  Request,
  Body,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdatePreferencesDto } from './dto/update-preferences.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { DeleteAccountDto } from './dto/delete-account.dto';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  async getProfile(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Get('profile')
  async getProfileData(@Request() req) {
    return this.usersService.findOne(req.user.id);
  }

  @Put('profile')
  async updateProfile(@Request() req, @Body() updateDto: UpdateProfileDto) {
    return this.usersService.updateProfile(req.user.id, updateDto);
  }

  @Put('preferences')
  async updatePreferences(@Request() req, @Body() preferencesDto: UpdatePreferencesDto) {
    return this.usersService.updatePreferences(req.user.id, preferencesDto);
  }

  @Post('change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usersService.changePassword(
      req.user.id,
      changePasswordDto.currentPassword,
      changePasswordDto.newPassword,
    );
  }

  @Delete('account')
  @HttpCode(HttpStatus.OK)
  async deleteAccount(@Request() req, @Body() deleteDto: DeleteAccountDto) {
    return this.usersService.deleteAccount(req.user.id, deleteDto.password);
  }

  @Get('activity')
  async getActivity(@Request() req, @Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.usersService.getActivity(req.user.id, limitNum);
  }

  @Get('billing-info')
  async getBillingInfo(@Request() req) {
    return this.usersService.getBillingInfo(req.user.id);
  }
}

