"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("@nestjs/config");
exports.CloudinaryProvider = {
    provide: 'CLOUDINARY',
    inject: [config_1.ConfigService],
    useFactory: (config) => {
        const name = config.get('CLOUDINARY_NAME') || 'dpghar606';
        const key = config.get('CLOUDINARY_API_KEY') || '172512846766242';
        const secret = config.get('CLOUDINARY_API_SECRET') || '8lWG6xgLDd3K64dBiEpATkNPz50';
        return cloudinary_1.v2.config({
            cloud_name: name,
            api_key: key,
            api_secret: secret,
        });
    },
};
//# sourceMappingURL=cloudinary.config.js.map