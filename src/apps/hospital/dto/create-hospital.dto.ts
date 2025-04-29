import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHospitalAddressDto } from './create-hospital-address.dto';

export class CreateHospitalDto {
  @ApiProperty({ example: '12345678000199' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: 'Hospital São João' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'uuid-do-diretor' })
  @IsUUID()
  director: string;

  @ApiProperty({ type: () => CreateHospitalAddressDto })
  @ValidateNested()
  @Type(() => CreateHospitalAddressDto)
  address: CreateHospitalAddressDto;
}
