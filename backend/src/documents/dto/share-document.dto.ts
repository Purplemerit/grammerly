import { IsString, IsEmail, IsIn, IsOptional } from 'class-validator';

export class ShareDocumentDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  teamId?: string;

  @IsString()
  @IsIn(['VIEW', 'COMMENT', 'EDIT', 'MANAGE'])
  permission: string;

  @IsOptional()
  @IsString()
  @IsIn(['USER', 'TEAM', 'PUBLIC'])
  shareType?: string;
}

