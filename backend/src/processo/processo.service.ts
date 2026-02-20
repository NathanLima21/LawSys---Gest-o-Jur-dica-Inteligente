import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';

@Injectable()
export class ProcessoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProcessoDto: CreateProcessoDto, advogadoId: string) {
    return await this.prisma.processo.create({
      data: {
        numero: createProcessoDto.numero,
        titulo: createProcessoDto.titulo,
        status: createProcessoDto.status || 'Pendente',
        tipo: createProcessoDto.tipo,
        cliente: { connect: { id: createProcessoDto.clienteId } },
        advogado: { connect: { id: advogadoId } }
      }
    });
  }

  async findAll(advogadoId: string) {
    return await this.prisma.processo.findMany({
      where: { advogadoId },
      include: { cliente: true } // Para aparecer o nome do cliente na tabela
    });
  }

  // ESSA ESTAVA FALTANDO NO SEU ERRO
  async findOne(id: string) {
    return await this.prisma.processo.findUnique({
      where: { id },
      include: { cliente: true }
    });
  }

  // ESSA TAMBÉM ESTAVA FALTANDO
  async update(id: string, updateProcessoDto: UpdateProcessoDto) {
    return await this.prisma.processo.update({
      where: { id },
      data: updateProcessoDto
    });
  }

  // CORREÇÃO DO ERRO DE 2 ARGUMENTOS
  async remove(id: string, advogadoId: string) {
    return await this.prisma.processo.delete({
      where: { id, advogadoId } 
    });
  }
}