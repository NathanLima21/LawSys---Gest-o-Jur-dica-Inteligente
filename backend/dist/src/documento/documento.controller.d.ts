import { DocumentoService } from './documento.service';
import { CreateDocumentoDto } from './dto/create-documento.dto';
export declare class DocumentoController {
    private readonly documentoService;
    constructor(documentoService: DocumentoService);
    uploadFile(file: Express.Multer.File, createDocumentoDto: CreateDocumentoDto): Promise<unknown>;
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
