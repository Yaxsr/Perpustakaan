// upload.service.ts
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions } from '@nestjs/platform-express';

@Injectable()
export class UploadService {
  constructor() {}

  multerOptions(): MulterModuleOptions {
    return {
      fileFilter: (req, file, callback) => {
        if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          callback(null, true);
        } else {
          callback(new Error('Invalid file type'), false);
        }
      },
    };
  }
}
