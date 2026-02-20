import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';

@Injectable()
export class PrazoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPrazoDto: CreatePrazoDto) {
    return await this.prisma.prazo.create({
      data: {
        descricao: createPrazoDto.descricao,
        // Removemos a propriedade 'data' que não existe no Prisma
        // E usamos apenas a 'dataLimite' que o erro apontou como necessária
        dataLimite: new Date(createPrazoDto.dataLimite), 
        processoId: createPrazoDto.processoId,
      },
    });
  }

  async findAll(processoId?: string) {
    return await this.prisma.prazo.findMany({
      where: processoId ? { processoId } : {},
      include: { processo: true }, // Opcional: traz os dados do processo junto
    });
  }

  async findOne(id: string) {
    return await this.prisma.prazo.findUnique({
      where: { id },
      include: { processo: true },
    });
  }

  async update(id: string, updatePrazoDto: UpdatePrazoDto) {
    return await this.prisma.prazo.update({
      where: { id },
      data: {
        ...updatePrazoDto,
        // Garante que se a data for atualizada, ela vire um objeto Date
        ...(updatePrazoDto.dataLimite && { dataLimite: new Date(updatePrazoDto.dataLimite) }),
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.prazo.delete({
      where: { id },
    });
  }
}