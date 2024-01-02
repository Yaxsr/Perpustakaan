

// multer.module.ts
import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Book } from 'src/book/entities/book.entity';

@Module({

  imports: [
    TypeOrmModule.forFeature([Book]), // Import the Book entity
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads', // Define the destination directory
        filename: (req, file, callback) => {
          const filename = `${Date.now()}-${file.originalname}`;
          callback(null, filename);
        },
      }),
    }),
  ],




  exports: [MulterModule],
})
export class MulterConfigModule {}

export { MulterModule };

