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
exports.FinanceiroService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FinanceiroService = class FinanceiroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createFinanceiroDto) {
        const dto = createFinanceiroDto;
        return await this.prisma.financeiro.create({
            data: {
                descricao: dto.descricao,
                valor: dto.valor,
                tipo: dto.tipo,
                status: dto.status || 'PENDENTE',
                data: new Date(dto.data || dto.vencimento || new Date()),
                processoId: dto.processoId,
            },
        });
    }
    async findAll(processoId) {
        return await this.prisma.financeiro.findMany({
            where: processoId ? { processoId } : {},
            include: { processo: true },
            orderBy: { data: 'asc' },
        });
    }
    async findOne(id) {
        return await this.prisma.financeiro.findUnique({
            where: { id },
            include: { processo: true },
        });
    }
    async update(id, updateFinanceiroDto) {
        const dto = updateFinanceiroDto;
        return await this.prisma.financeiro.update({
            where: { id },
            data: {
                ...dto,
                ...((dto.data || dto.vencimento) && {
                    data: new Date(dto.data || dto.vencimento)
                }),
            },
        });
    }
    async remove(id) {
        return await this.prisma.financeiro.delete({
            where: { id },
        });
    }
};
exports.FinanceiroService = FinanceiroService;
exports.FinanceiroService = FinanceiroService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FinanceiroService);
//# sourceMappingURL=financeiro.service.js.map