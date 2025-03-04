import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

import { UserStatus } from '../enums/user-status.enum';

export class UpdateUserStatusDto {
  @ApiProperty({ enum: UserStatus, enumName: 'UserStatus' })
  @IsEnum(UserStatus)
  @IsNotEmpty()
  status: UserStatus;
}
