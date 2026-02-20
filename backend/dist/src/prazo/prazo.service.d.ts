import { PrismaService } from '../../prisma/prisma.service';
import { CreatePrazoDto } from './dto/create-prazo.dto';
import { UpdatePrazoDto } from './dto/update-prazo.dto';
export declare class PrazoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createPrazoDto: CreatePrazoDto): Promise<{
        id: string;
        descricao: string;
        dataLimite: Date;
        finalizado: boolean;
        processoId: string;
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
        id: string;
        descricao: string;
        dataLimite: Date;
        finalizado: boolean;
        processoId: string;
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
        id: string;
        descricao: string;
        dataLimite: Date;
        finalizado: boolean;
        processoId: string;
    }) | null>;
    update(id: string, updatePrazoDto: UpdatePrazoDto): Promise<{
        id: string;
        descricao: string;
        dataLimite: Date;
        finalizado: boolean;
        processoId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        descricao: string;
        dataLimite: Date;
        finalizado: boolean;
        processoId: string;
    }>;
}
