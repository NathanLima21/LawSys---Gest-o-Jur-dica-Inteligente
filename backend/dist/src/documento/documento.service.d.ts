import { PrismaService } from '../../prisma/prisma.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
export declare class DocumentoService {
    private prisma;
    private cloudinaryProvider;
    constructor(prisma: PrismaService, cloudinaryProvider: any);
    uploadImage(file: Express.Multer.File, dto: CreateDocumentoDto): Promise<unknown>;
    findAll(): Promise<({
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
        nome: string;
        id: string;
        createdAt: Date;
        tipo: string;
        processoId: string;
        url: string;
        publicId: string;
    })[]>;
    remove(id: string): Promise<{
        nome: string;
        id: string;
        createdAt: Date;
        tipo: string;
        processoId: string;
        url: string;
        publicId: string;
    }>;
}
