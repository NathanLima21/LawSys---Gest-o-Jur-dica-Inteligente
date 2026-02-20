import { Module } from '@nestjs/common';
import { PrazoService } from './prazo.service';
import { PrazoController } from './prazo.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PrazoController],
  providers: [PrazoService],
})
export class PrazoModule {}
