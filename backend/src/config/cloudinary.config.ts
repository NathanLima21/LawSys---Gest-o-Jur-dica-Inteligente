import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const CloudinaryProvider = {
  provide: 'CLOUDINARY',
  inject: [ConfigService],
  useFactory: (config: ConfigService) => {
    const name = config.get('CLOUDINARY_NAME') || 'dpghar606';
    const key = config.get('CLOUDINARY_API_KEY') || '172512846766242';
    const secret = config.get('CLOUDINARY_API_SECRET') || '8lWG6xgLDd3K64dBiEpATkNPz50';

    return cloudinary.config({
      cloud_name: name,
      api_key: key,
      api_secret: secret,
    });
  },
};