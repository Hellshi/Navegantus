import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDate,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('BR')
  phone: string;

  @IsIn(['male', 'female', 'other'])
  birthSex: string;

  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @IsOptional()
  @IsString()
  healthInsurance?: string;
}