import { ProcessoService } from './processo.service';
import { CreateProcessoDto } from './dto/create-processo.dto';
import { UpdateProcessoDto } from './dto/update-processo.dto';
export declare class ProcessoController {
    private readonly processoService;
    constructor(processoService: ProcessoService);
    create(createDto: CreateProcessoDto, user: any): Promise<{
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
    findAll(user: any): Promise<({
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
    update(id: string, updateDto: UpdateProcessoDto): Promise<{
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
    remove(id: string, user: any): Promise<{
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
