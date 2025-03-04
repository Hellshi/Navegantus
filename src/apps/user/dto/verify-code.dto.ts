import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyCodeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  code: string;
}
