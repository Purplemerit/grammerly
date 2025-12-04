import { IsString, IsOptional } from 'class-validator';

export class DeleteAccountDto {
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  reason?: string;
}

