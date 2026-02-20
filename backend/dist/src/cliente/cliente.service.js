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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ClienteService = class ClienteService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createClienteDto, advogadoId) {
        return this.prisma.cliente.create({
            data: {
                ...createClienteDto,
                advogadoId: advogadoId,
            },
        });
    }
    async findAll(advogadoId) {
        return this.prisma.cliente.findMany({
            where: {
                advogadoId: advogadoId,
            },
        });
    }
    async remove(id, advogadoId) {
        const processos = await this.prisma.processo.findMany({
            where: { clienteId: id },
            select: { id: true }
        });
        const processoIds = processos.map(p => p.id);
        await this.prisma.financeiro.deleteMany({
            where: {
                processoId: { in: processoIds }
            }
        });
        await this.prisma.documento.deleteMany({
            where: {
                processoId: { in: processoIds }
            }
        });
        await this.prisma.prazo.deleteMany({
            where: {
                processoId: { in: processoIds }
            }
        });
        await this.prisma.processo.deleteMany({
            where: { clienteId: id }
        });
        return this.prisma.cliente.deleteMany({
            where: {
                id: id,
                advogadoId: advogadoId,
            },
        });
    }
};
exports.ClienteService = ClienteService;
exports.ClienteService = ClienteService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClienteService);
//# sourceMappingURL=cliente.service.js.map