import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { Book } from './entities/book.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterConfigModule } from 'src/multer/multer.module';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), MulterConfigModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
