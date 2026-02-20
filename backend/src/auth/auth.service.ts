import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdvogadoService } from '../advogado/advogado.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly advogadoService: AdvogadoService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, senhaPassada: string) {
    const advogado = await this.advogadoService.findByEmail(email);

    if (advogado && (await bcrypt.compare(senhaPassada, advogado.senha))) {
      const payload = { sub: advogado.id, email: advogado.email };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }

    throw new UnauthorizedException('E-mail ou senha incorretos');
  }
}
