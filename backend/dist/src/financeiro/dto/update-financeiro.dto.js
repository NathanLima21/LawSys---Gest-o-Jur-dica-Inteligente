"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFinanceiroDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_financeiro_dto_1 = require("./create-financeiro.dto");
class UpdateFinanceiroDto extends (0, mapped_types_1.PartialType)(create_financeiro_dto_1.CreateFinanceiroDto) {
}
exports.UpdateFinanceiroDto = UpdateFinanceiroDto;
//# sourceMappingURL=update-financeiro.dto.js.map