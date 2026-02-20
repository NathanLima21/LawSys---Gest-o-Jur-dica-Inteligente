import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(private prisma: PrismaService) {}

  // 1. Função para CRIAR cliente
  async create(createClienteDto: CreateClienteDto, advogadoId: string) {
    return this.prisma.cliente.create({
      data: {
        ...createClienteDto,
        advogadoId: advogadoId,
      },
    });
  }

  // 2. Função para LISTAR clientes (Apenas os do advogado logado)
  async findAll(advogadoId: string) {
    return this.prisma.cliente.findMany({
      where: {
        advogadoId: advogadoId,
      },
    });
  }

  // 3. Função para REMOVER cliente (A que estávamos adicionando)
 async remove(id: string, advogadoId: string) {
  // 1º: Localiza os IDs dos processos desse cliente
  const processos = await this.prisma.processo.findMany({
    where: { clienteId: id },
    select: { id: true }
  });

  const processoIds = processos.map(p => p.id);

  // 2º: Limpa o FINANCEIRO (O bloqueio atual)
  await this.prisma.financeiro.deleteMany({
    where: {
      processoId: { in: processoIds }
    }
  });

  // 3º: Limpa os DOCUMENTOS
  await this.prisma.documento.deleteMany({
    where: {
      processoId: { in: processoIds }
    }
  });

  // 4º: Limpa os PRAZOS
  await this.prisma.prazo.deleteMany({
    where: {
      processoId: { in: processoIds }
    }
  });

  // 5º: Apaga os PROCESSOS (Agora as amarras financeiras e de prazos sumiram)
  await this.prisma.processo.deleteMany({
    where: { clienteId: id }
  });

  // 6º: Finalmente, apaga o CLIENTE
  return this.prisma.cliente.deleteMany({
    where: {
      id: id,
      advogadoId: advogadoId,
    },
  });
 }
}