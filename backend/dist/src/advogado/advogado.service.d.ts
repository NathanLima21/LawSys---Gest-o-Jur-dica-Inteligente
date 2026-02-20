import { PrismaService } from '../../prisma/prisma.service';
import { CreateAdvogadoDto } from './dto/create-advogado.dto';
import { UpdateAdvogadoDto } from './dto/update-advogado.dto';
export declare class AdvogadoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createAdvogadoDto: CreateAdvogadoDto): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    }>;
    findByEmail(email: string): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    } | null>;
    findAll(): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    } | null>;
    update(id: string, updateAdvogadoDto: UpdateAdvogadoDto): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        nome: string;
        email: string;
        senha: string;
        oab: string;
        id: string;
        createdAt: Date;
    }>;
}
