import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateFinanceiroDto } from './dto/update-financeiro.dto';

@Injectable()
export class FinanceiroService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createFinanceiroDto: CreateFinanceiroDto) {
    const dto = createFinanceiroDto as any; // Força a leitura de qualquer campo
    return await this.prisma.financeiro.create({
      data: {
        descricao: dto.descricao,
        valor: dto.valor,
        tipo: dto.tipo,
        status: dto.status || 'PENDENTE',
        // Tenta pegar 'data' ou 'vencimento' do que vier do Postman
        data: new Date(dto.data || dto.vencimento || new Date()), 
        processoId: dto.processoId,
      },
    });
  }

  async findAll(processoId?: string) {
    return await this.prisma.financeiro.findMany({
      where: processoId ? { processoId } : {},
      include: { processo: true },
      orderBy: { data: 'asc' },
    });
  }

  async findOne(id: string) {
    return await this.prisma.financeiro.findUnique({
      where: { id },
      include: { processo: true },
    });
  }

  async update(id: string, updateFinanceiroDto: UpdateFinanceiroDto) {
    const dto = updateFinanceiroDto as any;
    return await this.prisma.financeiro.update({
      where: { id },
      data: {
        ...dto,
        ...( (dto.data || dto.vencimento) && { 
          data: new Date(dto.data || dto.vencimento) 
        }),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.financeiro.delete({
      where: { id },
    });
  }
}