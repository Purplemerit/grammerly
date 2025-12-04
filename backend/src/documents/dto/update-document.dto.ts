import { IsString, IsOptional, MaxLength, IsIn, IsBoolean } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsString()
  @MaxLength(500)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  @IsIn(['essay', 'article', 'email', 'blog', 'code', 'other'])
  type?: string;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

