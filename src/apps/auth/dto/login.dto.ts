import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ default: 'Password@123' })
  @IsString()
  @IsNotEmpty()
  password: string;

  headers?: any;
}
