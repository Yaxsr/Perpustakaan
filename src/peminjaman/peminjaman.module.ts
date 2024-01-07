import { Module } from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { PeminjamanController } from './peminjaman.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peminjam } from './entities/peminjaman.entity';
import { Member } from 'src/member/entities/member.entity';
import { Book } from 'src/book/entities/book.entity';
import { BookService } from 'src/book/book.service';
import { Pengembalian } from 'src/pengembalian/entities/pengembalian.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peminjam, Member, Book, Pengembalian])],
  controllers: [PeminjamanController],
  providers: [PeminjamanService, BookService],
})
export class PeminjamanModule {}
