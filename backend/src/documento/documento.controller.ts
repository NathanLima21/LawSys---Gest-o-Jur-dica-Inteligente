import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, Body, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('documento')
@UseGuards(JwtAuthGuard)
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDocumentoDto: CreateDocumentoDto
  ) {
    return this.documentoService.uploadImage(file, createDocumentoDto);
  }

  // ROTA PARA LISTAR TODOS OS DOCUMENTOS NO FRONTEND
  @Get()
  async findAll() {
    return this.documentoService.findAll();
  }

  // ROTA PARA EXCLUIR (LIXEIRA)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.documentoService.remove(id);
  }
}