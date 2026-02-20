"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePrazoDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_prazo_dto_1 = require("./create-prazo.dto");
class UpdatePrazoDto extends (0, mapped_types_1.PartialType)(create_prazo_dto_1.CreatePrazoDto) {
}
exports.UpdatePrazoDto = UpdatePrazoDto;
//# sourceMappingURL=update-prazo.dto.js.map