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
exports.PrazoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PrazoService = class PrazoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPrazoDto) {
        return await this.prisma.prazo.create({
            data: {
                descricao: createPrazoDto.descricao,
                dataLimite: new Date(createPrazoDto.dataLimite),
                processoId: createPrazoDto.processoId,
            },
        });
    }
    async findAll(processoId) {
        return await this.prisma.prazo.findMany({
            where: processoId ? { processoId } : {},
            include: { processo: true },
        });
    }
    async findOne(id) {
        return await this.prisma.prazo.findUnique({
            where: { id },
            include: { processo: true },
        });
    }
    async update(id, updatePrazoDto) {
        return await this.prisma.prazo.update({
            where: { id },
            data: {
                ...updatePrazoDto,
                ...(updatePrazoDto.dataLimite && { dataLimite: new Date(updatePrazoDto.dataLimite) }),
            },
        });
    }
    async remove(id) {
        return await this.prisma.prazo.delete({
            where: { id },
        });
    }
};
exports.PrazoService = PrazoService;
exports.PrazoService = PrazoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PrazoService);
//# sourceMappingURL=prazo.service.js.map