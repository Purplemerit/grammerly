import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { GrammarService } from './grammar.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CheckGrammarDto } from './dto/check-grammar.dto';

@Controller('grammar')
@UseGuards(JwtAuthGuard)
export class GrammarController {
  constructor(private readonly grammarService: GrammarService) {}

  @Post('check')
  @HttpCode(HttpStatus.OK)
  async checkGrammar(@Request() req, @Body() checkDto: CheckGrammarDto) {
    return this.grammarService.checkGrammar(req.user.id, checkDto);
  }

  @Get('check/history')
  async getCheckHistory(
    @Request() req,
    @Query('documentId') documentId?: string,
    @Query('limit') limit?: string,
  ) {
    const limitNum = limit ? parseInt(limit, 10) : 50;
    return this.grammarService.getCheckHistory(req.user.id, documentId, limitNum);
  }

  @Get('check/:checkId')
  async getCheckDetails(@Request() req, @Param('checkId') checkId: string) {
    return this.grammarService.getCheckDetails(checkId, req.user.id);
  }
}

