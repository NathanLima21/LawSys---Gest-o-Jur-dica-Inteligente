"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrazoModule = void 0;
const common_1 = require("@nestjs/common");
const prazo_service_1 = require("./prazo.service");
const prazo_controller_1 = require("./prazo.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
let PrazoModule = class PrazoModule {
};
exports.PrazoModule = PrazoModule;
exports.PrazoModule = PrazoModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        controllers: [prazo_controller_1.PrazoController],
        providers: [prazo_service_1.PrazoService],
    })
], PrazoModule);
//# sourceMappingURL=prazo.module.js.map