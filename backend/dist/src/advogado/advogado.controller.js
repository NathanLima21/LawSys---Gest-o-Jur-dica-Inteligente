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
exports.AdvogadoController = void 0;
const common_1 = require("@nestjs/common");
const advogado_service_1 = require("./advogado.service");
const create_advogado_dto_1 = require("./dto/create-advogado.dto");
const update_advogado_dto_1 = require("./dto/update-advogado.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let AdvogadoController = class AdvogadoController {
    advogadoService;
    constructor(advogadoService) {
        this.advogadoService = advogadoService;
    }
    create(createAdvogadoDto) {
        return this.advogadoService.create(createAdvogadoDto);
    }
    findAll() {
        return this.advogadoService.findAll();
    }
    findOne(id) {
        return this.advogadoService.findOne(id);
    }
    update(id, updateAdvogadoDto) {
        return this.advogadoService.update(id, updateAdvogadoDto);
    }
    remove(id) {
        return this.advogadoService.remove(id);
    }
};
exports.AdvogadoController = AdvogadoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_advogado_dto_1.CreateAdvogadoDto]),
    __metadata("design:returntype", void 0)
], AdvogadoController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdvogadoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvogadoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_advogado_dto_1.UpdateAdvogadoDto]),
    __metadata("design:returntype", void 0)
], AdvogadoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdvogadoController.prototype, "remove", null);
exports.AdvogadoController = AdvogadoController = __decorate([
    (0, common_1.Controller)('advogado'),
    __metadata("design:paramtypes", [advogado_service_1.AdvogadoService])
], AdvogadoController);
//# sourceMappingURL=advogado.controller.js.map