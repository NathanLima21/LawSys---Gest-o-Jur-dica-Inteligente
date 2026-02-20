"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentoService = void 0;
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const prisma_service_1 = require("../../prisma/prisma.service");
const toStream = require("buffer-to-stream");
let DocumentoService = class DocumentoService {
    prisma;
    cloudinaryProvider;
    constructor(prisma, cloudinaryProvider) {
        this.prisma = prisma;
        this.cloudinaryProvider = cloudinaryProvider;
    }
    async uploadImage(file, dto) {
        return new Promise((resolve, reject) => {
            const upload = cloudinary_1.v2.uploader.upload_stream((error, result) => {
                if (error)
                    return reject(error);
                if (!result)
                    return reject(new Error('Falha ao obter resposta do Cloudinary'));
                this.prisma.documento.create({
                    data: {
                        nome: dto.nome,
                        url: result.secure_url,
                        publicId: result.public_id,
                        tipo: file.mimetype,
                        processoId: dto.processoId,
                    },
                    include: { processo: true }
                })
                    .then(novoDoc => resolve(novoDoc))
                    .catch(dbError => reject(dbError));
            });
            toStream(file.buffer).pipe(upload);
        });
    }
    async findAll() {
        return this.prisma.documento.findMany({
            include: { processo: true },
            orderBy: { createdAt: 'desc' }
        });
    }
    async remove(id) {
        const documento = await this.prisma.documento.findUnique({ where: { id } });
        if (!documento) {
            throw new common_1.NotFoundException('Documento não encontrado no sistema.');
        }
        try {
            await cloudinary_1.v2.uploader.destroy(documento.publicId);
            return await this.prisma.documento.delete({ where: { id } });
        }
        catch (error) {
            throw new Error('Erro ao processar a exclusão do arquivo.');
        }
    }
};
exports.DocumentoService = DocumentoService;
exports.DocumentoService = DocumentoService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)('CLOUDINARY')),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, Object])
], DocumentoService);
//# sourceMappingURL=documento.service.js.map