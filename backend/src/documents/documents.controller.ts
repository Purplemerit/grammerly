import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DocumentsService } from './documents.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { ShareDocumentDto } from './dto/share-document.dto';

@Controller('documents')
@UseGuards(JwtAuthGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Request() req, @Body() createDto: CreateDocumentDto) {
    return this.documentsService.create(req.user.id, createDto);
  }

  @Get()
  async findAll(
    @Request() req,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sort') sort?: string,
    @Query('search') search?: string,
    @Query('filter') filter?: string,
  ) {
    return this.documentsService.findAll(
      req.user.id,
      page ? parseInt(page, 10) : 1,
      limit ? parseInt(limit, 10) : 20,
      sort || '-created_at',
      search,
      filter,
    );
  }

  @Get('shared')
  async getSharedDocuments(@Request() req) {
    return this.documentsService.getSharedDocuments(req.user.id);
  }

  @Get('trash')
  async getTrash(@Request() req) {
    return this.documentsService.getTrash(req.user.id);
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    return this.documentsService.findOne(id, req.user.id);
  }

  @Put(':id')
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateDto: UpdateDocumentDto,
  ) {
    return this.documentsService.update(id, req.user.id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Request() req, @Param('id') id: string) {
    return this.documentsService.remove(id, req.user.id);
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  async restore(@Request() req, @Param('id') id: string) {
    return this.documentsService.restore(id, req.user.id);
  }

  @Post(':id/share')
  @HttpCode(HttpStatus.OK)
  async share(
    @Request() req,
    @Param('id') id: string,
    @Body() shareDto: ShareDocumentDto,
  ) {
    return this.documentsService.share(id, req.user.id, shareDto);
  }
}

