import { PrismaService } from '../../prisma/prisma.service';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
export declare class ProcessoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createProcessoDto: CreateProcessoDto, advogadoId: string): Promise<{
        id: string;
        createdAt: Date;
        advogadoId: string;
        numero: string;
        titulo: string;
        status: string;
        tipo: string | null;
        tribunal: string | null;
        clienteId: string;
    }>;
    findAll(advogadoId: string): Promise<({
        cliente: {
            nome: string;
            email: string | null;
            id: string;
            createdAt: Date;
            cpf_cnpj: string;
            telefone: string | null;
            advogadoId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        advogadoId: string;
        numero: string;
        titulo: string;
        status: string;
        tipo: string | null;
        tribunal: string | null;
        clienteId: string;
    })[]>;
    findOne(id: string): Promise<({
        cliente: {
            nome: string;
            email: string | null;
            id: string;
            createdAt: Date;
            cpf_cnpj: string;
            telefone: string | null;
            advogadoId: string;
        };
    } & {
        id: string;
        createdAt: Date;
        advogadoId: string;
        numero: string;
        titulo: string;
        status: string;
        tipo: string | null;
        tribunal: string | null;
        clienteId: string;
    }) | null>;
    update(id: string, updateProcessoDto: UpdateProcessoDto): Promise<{
        id: string;
        createdAt: Date;
        advogadoId: string;
        numero: string;
        titulo: string;
        status: string;
        tipo: string | null;
        tribunal: string | null;
        clienteId: string;
    }>;
    remove(id: string, advogadoId: string): Promise<{
        id: string;
        createdAt: Date;
        advogadoId: string;
        numero: string;
        titulo: string;
        status: string;
        tipo: string | null;
        tribunal: string | null;
        clienteId: string;
    }>;
}
