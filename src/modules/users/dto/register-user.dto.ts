import { Exclude } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Matches, MinLength, ValidateIf } from 'class-validator';

export class RegisterUserDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  @ValidateIf((o) => o.email != '')
  email?: string;

  @IsOptional()
  @IsString()
  @ValidateIf((o) => o.phone != '')
  phone?: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, {
    message: ' Password must contain at least one letter and one number',
  })
  password: string;

  @IsString()
  confirmPassword: string;
}
