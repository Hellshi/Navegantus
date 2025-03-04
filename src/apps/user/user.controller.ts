import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { RoleName } from '../../common/enums/roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { BasicAuth } from '../auth/decorators/basic-auth.decorator';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { Request as RequestExpress } from 'express';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { VerifyCodeDto } from './dto/verify-code.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { CommonJwtAuth } from '../auth/decorators/common-auth.decorator';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @CommonJwtAuth()
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @Roles(RoleName.MASTER)
  @HttpCode(HttpStatus.NO_CONTENT)
  @CommonJwtAuth()
  updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Post()
  @Roles(RoleName.MASTER)
  @CommonJwtAuth()
  create(@Body() dto: CreateUserDto, @Request() req: RequestExpress) {
    return this.userService.createUser(dto, req.user.name);
  }

  @Patch('create-password')
  @BasicAuth()
  updatePassword(@Body() dto: UpdatePasswordDto) {
    return this.userService.createPassword(dto.code, dto.password);
  }

  @Patch('reset-password-dashboard')
  @CommonJwtAuth()
  resetPassword(@Body() dto: ResetPasswordDto, @Request() req: RequestExpress) {
    const {
      user: { id },
    } = req;
    return this.userService.resetPassword({
      oldPassword: dto.oldPassword,
      password: dto.password,
      userId: id,
    });
  }

  @Patch('profile')
  @CommonJwtAuth()
  updateProfile(@Body() dto: UpdateProfileDto, @Request() req: RequestExpress) {
    const {
      user: { id },
    } = req;
    return this.userService.updateProfile(id, dto);
  }

  @Post('verify-code')
  @BasicAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  async verifyCode(@Body() dto: VerifyCodeDto) {
    await this.userService.verifyCode(dto.code);
  }

  @Patch('status/:id')
  @CommonJwtAuth()
  @Roles(RoleName.MASTER)
  @HttpCode(HttpStatus.NO_CONTENT)
  updateStatus(@Param('id') id: string, @Body() dto: UpdateUserStatusDto) {
    return this.userService.updateUserStatus(id, dto.status);
  }
}
