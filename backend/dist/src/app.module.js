"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const advogado_module_1 = require("./advogado/advogado.module");
const cliente_module_1 = require("./cliente/cliente.module");
const processo_module_1 = require("./processo/processo.module");
const auth_module_1 = require("./auth/auth.module");
const prisma_module_1 = require("../prisma/prisma.module");
const prazo_module_1 = require("./prazo/prazo.module");
const documento_module_1 = require("./documento/documento.module");
const financeiro_module_1 = require("./financeiro/financeiro.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            prisma_module_1.PrismaModule,
            advogado_module_1.AdvogadoModule,
            cliente_module_1.ClienteModule,
            processo_module_1.ProcessoModule,
            auth_module_1.AuthModule,
            prazo_module_1.PrazoModule,
            documento_module_1.DocumentoModule,
            financeiro_module_1.FinanceiroModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map