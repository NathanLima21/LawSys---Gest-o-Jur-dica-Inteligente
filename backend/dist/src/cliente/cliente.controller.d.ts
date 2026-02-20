import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
export declare class ClienteController {
    private readonly clienteService;
    constructor(clienteService: ClienteService);
    create(createClienteDto: CreateClienteDto, user: {
        userId: string;
    }): Promise<{
        nome: string;
        email: string | null;
        id: string;
        createdAt: Date;
        cpf_cnpj: string;
        telefone: string | null;
        advogadoId: string;
    }>;
    findAll(user: {
        userId: string;
    }): Promise<{
        nome: string;
        email: string | null;
        id: string;
        createdAt: Date;
        cpf_cnpj: string;
        telefone: string | null;
        advogadoId: string;
    }[]>;
    remove(id: string, user: {
        userId: string;
    }): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
