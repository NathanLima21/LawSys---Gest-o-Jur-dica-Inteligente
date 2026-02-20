import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import toStream = require('buffer-to-stream');

@Injectable()
export class DocumentoService {
  constructor(
    private prisma: PrismaService,
    @Inject('CLOUDINARY') private cloudinaryProvider, 
  ) {}

  async uploadImage(file: Express.Multer.File, dto: CreateDocumentoDto) {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        if (!result) return reject(new Error('Falha ao obter resposta do Cloudinary'));

        this.prisma.documento.create({
          data: {
            nome: dto.nome,
            url: result.secure_url,
            publicId: result.public_id,
            tipo: file.mimetype,
            processoId: dto.processoId,
          },
          include: { processo: true } // Inclui o processo para exibir o número no front
        })
        .then(novoDoc => resolve(novoDoc))
        .catch(dbError => reject(dbError));
      });

      toStream(file.buffer).pipe(upload);
    });
  }

  // BUSCA TODOS COM OS DADOS DO PROCESSO
  async findAll() {
    return this.prisma.documento.findMany({
      include: { processo: true },
      orderBy: { createdAt: 'desc' }
    });
  }

  // REMOVE DO CLOUDINARY E DO BANCO
  async remove(id: string) {
    const documento = await this.prisma.documento.findUnique({ where: { id } });

    if (!documento) {
      throw new NotFoundException('Documento não encontrado no sistema.');
    }

    try {
      // 1. Deleta o arquivo físico no Cloudinary usando o publicId
      await cloudinary.uploader.destroy(documento.publicId);

      // 2. Deleta o registro no banco de dados
      return await this.prisma.documento.delete({ where: { id } });
    } catch (error) {
      throw new Error('Erro ao processar a exclusão do arquivo.');
    }
  }
}