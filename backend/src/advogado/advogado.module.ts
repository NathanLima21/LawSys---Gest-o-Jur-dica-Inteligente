import { Module } from '@nestjs/common'; // <-- ADICIONE ESTA LINHA
import { AdvogadoService } from './advogado.service';
import { AdvogadoController } from './advogado.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdvogadoController],
  providers: [AdvogadoService],
  exports: [AdvogadoService],
})
export class AdvogadoModule {}