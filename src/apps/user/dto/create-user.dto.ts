import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class ChurchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ChurchDto)
  church: ChurchDto;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID('4')
  role: string;

  @ApiProperty()
  @IsArray()
  @IsUUID('4', { each: true })
  statesId: string[];
}
