"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAdvogadoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_advogado_dto_1 = require("./create-advogado.dto");
class UpdateAdvogadoDto extends (0, mapped_types_1.PartialType)(create_advogado_dto_1.CreateAdvogadoDto) {
}
exports.UpdateAdvogadoDto = UpdateAdvogadoDto;
//# sourceMappingURL=update-advogado.dto.js.map