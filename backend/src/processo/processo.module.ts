import { Module } from '@nestjs/common';
import { ProcessoService } from './processo.service';
import { ProcessoController } from './processo.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Importação adicionada aqui

@Module({
  imports: [PrismaModule],
  controllers: [ProcessoController],
  providers: [ProcessoService],
})
export class ProcessoModule {}