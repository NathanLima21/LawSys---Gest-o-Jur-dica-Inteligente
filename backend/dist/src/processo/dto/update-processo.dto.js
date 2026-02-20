"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProcessoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_processo_dto_1 = require("./create-processo.dto");
class UpdateProcessoDto extends (0, mapped_types_1.PartialType)(create_processo_dto_1.CreateProcessoDto) {
}
exports.UpdateProcessoDto = UpdateProcessoDto;
//# sourceMappingURL=update-processo.dto.js.map