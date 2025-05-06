import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateHospitalAddressDto } from './create-hospital-address.dto';

class HospitalDirectorDto {
  @ApiProperty()
  @IsUUID()
  id: string;
}
export class CreateHospitalDto {
  @ApiProperty({ example: '12345678000199' })
  @IsString()
  @IsNotEmpty()
  cnpj: string;

  @ApiProperty({ example: 'Hospital São João' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: () => HospitalDirectorDto })
  @ValidateNested()
  @Type(() => HospitalDirectorDto)
  director: HospitalDirectorDto;

  @ApiProperty({ type: () => CreateHospitalAddressDto })
  @ValidateNested()
  @Type(() => CreateHospitalAddressDto)
  address: CreateHospitalAddressDto;
}
