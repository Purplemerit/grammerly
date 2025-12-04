import { IsEmail, IsString, MinLength, IsBoolean } from 'class-validator';

export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsString()
  full_name: string;

  @IsBoolean()
  acceptTerms: boolean;

  @IsBoolean()
  acceptPrivacy: boolean;
}

