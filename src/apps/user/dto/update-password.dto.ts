import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&" ".!@#$%^&*()\-+/:;=])[A-Za-z\d@$!%*?&" ".!@#$%^&*()\-+/:;=]{8,16}$/,
    {
      message:
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter and one number',
    },
  )
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  code: string;
}
