import { JwtService } from '@nestjs/jwt';
import { AdvogadoService } from '../advogado/advogado.service';
export declare class AuthService {
    private readonly advogadoService;
    private readonly jwtService;
    constructor(advogadoService: AdvogadoService, jwtService: JwtService);
    login(email: string, senhaPassada: string): Promise<{
        access_token: string;
    }>;
}
