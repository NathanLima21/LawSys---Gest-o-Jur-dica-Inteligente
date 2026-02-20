import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Isso ajuda a disponibilizar o Prisma em todo o projeto
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // ESSENCIAL: Permite que o AdvogadoService o encontre
})
export class PrismaModule {}
