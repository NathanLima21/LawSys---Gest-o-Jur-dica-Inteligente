import { PrismaService } from '../../prisma/prisma.service';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateFinanceiroDto } from './dto/update-financeiro.dto';
export declare class FinanceiroService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createFinanceiroDto: CreateFinanceiroDto): Promise<{
        data: Date;
        id: string;
        status: string;
        tipo: string;
        descricao: string;
        processoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
    }>;
    findAll(processoId?: string): Promise<({
        processo: {
            id: string;
            createdAt: Date;
            advogadoId: string;
            numero: string;
            titulo: string;
            status: string;
            tipo: string | null;
            tribunal: string | null;
            clienteId: string;
        };
    } & {
        data: Date;
        id: string;
        status: string;
        tipo: string;
        descricao: string;
        processoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findOne(id: string): Promise<({
        processo: {
            id: string;
            createdAt: Date;
            advogadoId: string;
            numero: string;
            titulo: string;
            status: string;
            tipo: string | null;
            tribunal: string | null;
            clienteId: string;
        };
    } & {
        data: Date;
        id: string;
        status: string;
        tipo: string;
        descricao: string;
        processoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
    }) | null>;
    update(id: string, updateFinanceiroDto: UpdateFinanceiroDto): Promise<{
        data: Date;
        id: string;
        status: string;
        tipo: string;
        descricao: string;
        processoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
    }>;
    remove(id: string): Promise<{
        data: Date;
        id: string;
        status: string;
        tipo: string;
        descricao: string;
        processoId: string;
        valor: import("@prisma/client/runtime/library").Decimal;
    }>;
}
