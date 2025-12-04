import { IsString, IsOptional, IsArray, MaxLength, MinLength, IsIn } from 'class-validator';

export class CheckGrammarDto {
  @IsString()
  @MinLength(1)
  @MaxLength(50000)
  text: string;

  @IsOptional()
  @IsString()
  documentId?: string;

  @IsOptional()
  @IsString()
  @IsIn(['en-US', 'en-GB', 'es-ES', 'fr-FR', 'de-DE', 'it-IT', 'pt-BR'])
  language?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  checkTypes?: string[];
}

