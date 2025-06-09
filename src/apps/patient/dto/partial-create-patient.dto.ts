import { IsString, IsDateString, IsUUID, IsEnum } from 'class-validator';
import { BirthSex } from 'src/apps/user/enums/birthSext.enum';

export class CreatePatientPartialDto {
  @IsString()
  name: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  mothersName: string;

  @IsString()
  rg: string;

  @IsString()
  cpf: string;

  @IsEnum(BirthSex)
  birthSex: BirthSex;

  @IsUUID()
  addressId: string;
}
