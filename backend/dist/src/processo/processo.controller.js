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
exports.ProcessoController = void 0;
const common_1 = require("@nestjs/common");
const processo_service_1 = require("./processo.service");
const create_processo_dto_1 = require("./dto/create-processo.dto");
const update_processo_dto_1 = require("./dto/update-processo.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const get_user_decorator_1 = require("../auth/get-user.decorator");
let ProcessoController = class ProcessoController {
    processoService;
    constructor(processoService) {
        this.processoService = processoService;
    }
    create(createDto, user) {
        return this.processoService.create(createDto, user.userId);
    }
    findAll(user) {
        return this.processoService.findAll(user.userId);
    }
    findOne(id) {
        return this.processoService.findOne(id);
    }
    update(id, updateDto) {
        return this.processoService.update(id, updateDto);
    }
    remove(id, user) {
        return this.processoService.remove(id, user.userId);
    }
};
exports.ProcessoController = ProcessoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_processo_dto_1.CreateProcessoDto, Object]),
    __metadata("design:returntype", void 0)
], ProcessoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProcessoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ProcessoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_processo_dto_1.UpdateProcessoDto]),
    __metadata("design:returntype", void 0)
], ProcessoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], ProcessoController.prototype, "remove", null);
exports.ProcessoController = ProcessoController = __decorate([
    (0, common_1.Controller)('processo'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [processo_service_1.ProcessoService])
], ProcessoController);
//# sourceMappingURL=processo.controller.js.map