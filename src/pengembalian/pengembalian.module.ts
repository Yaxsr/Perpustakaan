import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PengembalianService } from './pengembalian.service';
import { PengembalianController } from './pengembalian.controller';
import { Pengembalian } from './entities/pengembalian.entity'; // Import your entity
import { BookService } from 'src/book/book.service';
import { Member } from 'src/member/entities/member.entity';
import { Book } from 'src/book/entities/book.entity';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pengembalian, Member, Book, Peminjam])], // Include the TypeOrmModule with your entity
  controllers: [PengembalianController],
  providers: [PengembalianService],
})
export class PengembalianModule {}
