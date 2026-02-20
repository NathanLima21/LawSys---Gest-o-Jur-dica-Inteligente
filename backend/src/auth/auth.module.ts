import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdvogadoModule } from '../advogado/advogado.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    AdvogadoModule,
    PassportModule,
    JwtModule.register({
      secret: 'SUA_CHAVE_SECRETA_AQUI', // Em produção, use variáveis de ambiente (.env)
      signOptions: { expiresIn: '1d' }, // O token valerá por 1 dia
    }),
  ],
  providers: [AuthService, JwtStrategy], // JwtStrategy adicionada aqui
  controllers: [AuthController],
})
export class AuthModule {}
