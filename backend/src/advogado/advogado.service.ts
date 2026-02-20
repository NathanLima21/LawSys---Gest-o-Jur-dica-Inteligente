import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdvogadoDto } from './dto/create-advogado.dto';
import { UpdateAdvogadoDto } from './dto/update-advogado.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdvogadoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAdvogadoDto: CreateAdvogadoDto) {
    // 1. Validação de segurança: verifica se o DTO chegou preenchido
    if (!createAdvogadoDto || !createAdvogadoDto.senha) {
      throw new BadRequestException('Dados de cadastro inválidos ou senha ausente.');
    }

    // 2. Criptografia
    const salt = await bcrypt.genSalt();
    const senhaCriptografada = await bcrypt.hash(createAdvogadoDto.senha, salt);

    // 3. Salvando no banco
    return this.prisma.advogado.create({
      data: {
        ...createAdvogadoDto,
        senha: senhaCriptografada,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.advogado.findUnique({
      where: { email },
    });
  }

  async findAll() {
    return this.prisma.advogado.findMany();
  }

  async findOne(id: string) {
    return this.prisma.advogado.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAdvogadoDto: UpdateAdvogadoDto) {
    return this.prisma.advogado.update({
      where: { id },
      data: updateAdvogadoDto,
    });
  }

  async remove(id: string) {
    return this.prisma.advogado.delete({
      where: { id },
    });
  }
}