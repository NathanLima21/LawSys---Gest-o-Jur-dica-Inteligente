import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Importação necessária
import { AdvogadoModule } from './advogado/advogado.module';
import { ClienteModule } from './cliente/cliente.module';
import { ProcessoModule } from './processo/processo.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'; 
import { PrazoModule } from './prazo/prazo.module';
import { DocumentoModule } from './documento/documento.module';
import { FinanceiroModule } from './financeiro/financeiro.module';

@Module({
  imports: [
    // O ConfigModule deve ser SEMPRE o primeiro da lista!
    ConfigModule.forRoot({
      isGlobal: true, // Isso faz com que o .env funcione em todo o projeto
    }),
    PrismaModule,
    AdvogadoModule,
    ClienteModule,
    ProcessoModule,
    AuthModule,
    PrazoModule,
    DocumentoModule,
    FinanceiroModule,
  ],
})
export class AppModule {}