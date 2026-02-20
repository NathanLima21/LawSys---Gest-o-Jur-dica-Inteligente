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
exports.DocumentoController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const documento_service_1 = require("./documento.service");
const create_documento_dto_1 = require("./dto/create-documento.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let DocumentoController = class DocumentoController {
    documentoService;
    constructor(documentoService) {
        this.documentoService = documentoService;
    }
    async uploadFile(file, createDocumentoDto) {
        return this.documentoService.uploadImage(file, createDocumentoDto);
    }
    async findAll() {
        return this.documentoService.findAll();
    }
    async remove(id) {
        return this.documentoService.remove(id);
    }
};
exports.DocumentoController = DocumentoController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_documento_dto_1.CreateDocumentoDto]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentoController.prototype, "remove", null);
exports.DocumentoController = DocumentoController = __decorate([
    (0, common_1.Controller)('documento'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [documento_service_1.DocumentoService])
], DocumentoController);
//# sourceMappingURL=documento.controller.js.map