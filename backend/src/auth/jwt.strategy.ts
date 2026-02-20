import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SUA_CHAVE_SECRETA_AQUI', // TEM QUE SER IGUAL AO MODULE
    });
  
  }

  async validate(payload: any) {
    // Isso é o que o sistema "enxerga" depois de validar o token
    return { userId: payload.sub, email: payload.email };
  }
}
