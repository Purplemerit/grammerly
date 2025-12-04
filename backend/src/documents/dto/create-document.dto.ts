import { IsString, IsOptional, MaxLength, IsIn, IsBoolean } from 'class-validator';

export class CreateDocumentDto {
  @IsString()
  @MaxLength(500)
  title: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  @IsIn(['essay', 'article', 'email', 'blog', 'code', 'other'])
  type?: string;

  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}

