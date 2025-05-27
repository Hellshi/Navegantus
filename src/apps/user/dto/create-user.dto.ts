import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { RoleName } from 'src/apps/role/enum/roles.enum';
import { BirthSex } from '../enums/birthSext.enum';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'strongpassword123', writeOnly: true })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ enum: BirthSex })
  @IsEnum(BirthSex)
  birthSex: BirthSex;

  @ApiProperty({ example: '11999999999' })
  @IsString()
  @Matches(/^\d{10,11}$/, { message: 'phone must be a valid phone number' })
  phone: string;

  @ApiProperty({ example: '12345678901' })
  @IsString()
  @Matches(/^\d{11}$/, { message: 'cpf must be a valid CPF number' })
  cpf: string;

  @ApiProperty({ example: '123456', required: false })
  @IsOptional()
  @IsString()
  crm?: string;

  @ApiProperty({ example: '654321', required: false })
  @IsOptional()
  @IsString()
  cre?: string;

  @ApiProperty()
  @IsEnum(RoleName)
  role?: RoleName;
}
