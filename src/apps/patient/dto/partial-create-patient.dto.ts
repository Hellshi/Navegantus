import {
  IsOptional,
  IsString,
  IsDateString,
  IsEmail,
  Matches,
  IsEnum,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { BirthSex } from 'src/apps/user/enums/birthSext.enum';
import { Type } from 'class-transformer';
import { CreateUserAddressDto } from './userAddress.dto';

export class CreatePatientPartialDto {
  @ApiProperty({ description: 'Nome completo do paciente' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Nome social do paciente (se houver)' })
  @IsOptional()
  @IsString()
  social_name?: string;

  @ApiProperty({
    description: 'Data de nascimento do paciente',
    type: String,
    format: 'date',
    example: '1995-08-15',
  })
  birth_date: string;

  @ApiPropertyOptional({ description: 'Nome da mãe do paciente' })
  @IsOptional()
  @IsString()
  mothers_name?: string;

  @ApiPropertyOptional({ description: 'Número do RG' })
  @IsOptional()
  @IsString()
  rg?: string;

  @ApiPropertyOptional({ description: 'Número do CPF (11 dígitos)' })
  @IsOptional()
  @Matches(/^\d{11}$/, { message: 'CPF must be 11 digits' })
  cpf?: string;

  @ApiPropertyOptional({ description: 'Cartão do SUS' })
  @IsOptional()
  @IsString()
  sus_id_card?: string;

  @ApiPropertyOptional({ description: 'Convênio de saúde (nome ou código)' })
  @IsOptional()
  @IsString()
  health_insurance?: string;

  @ApiProperty({ enum: BirthSex })
  @IsEnum(BirthSex)
  birthSex: BirthSex;

  @ApiPropertyOptional({ format: 'email', description: 'E-mail do paciente' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({ description: 'Telefone principal do paciente' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ type: () => CreateUserAddressDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => CreateUserAddressDto)
  address?: CreateUserAddressDto;

  @ApiPropertyOptional({ description: 'Telefone do WhatsApp do paciente' })
  @IsOptional()
  @IsString()
  whatsapp_phone?: string;
}
