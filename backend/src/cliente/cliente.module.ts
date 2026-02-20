import { Module } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { ClienteController } from './cliente.controller';
import { PrismaModule } from '../../prisma/prisma.module'; // Ajustado para 2 níveis (../../)

@Module({
  imports: [PrismaModule],
  controllers: [ClienteController],
  providers: [ClienteService],
})
export class ClienteModule {}