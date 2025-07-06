import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { StateEnum } from 'src/apps/hospital/enum/state';

export class CreateUserAddressDto {
  @ApiProperty({ example: '01001000' })
  @IsString()
  @IsNotEmpty()
  cep: string;

  @ApiProperty({ example: 'São Paulo' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ enum: StateEnum, example: StateEnum.SP })
  @IsEnum(StateEnum)
  state: StateEnum;

  @ApiProperty({ example: 'Centro' })
  @IsString()
  @IsNotEmpty()
  neighborhood: string;
}
