import { PrismaService } from '../../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
export declare class ClienteService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createClienteDto: CreateClienteDto, advogadoId: string): Promise<{
        nome: string;
        email: string | null;
        id: string;
        createdAt: Date;
        cpf_cnpj: string;
        telefone: string | null;
        advogadoId: string;
    }>;
    findAll(advogadoId: string): Promise<{
        nome: string;
        email: string | null;
        id: string;
        createdAt: Date;
        cpf_cnpj: string;
        telefone: string | null;
        advogadoId: string;
    }[]>;
    remove(id: string, advogadoId: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
