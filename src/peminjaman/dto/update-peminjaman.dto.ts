import { PartialType } from '@nestjs/mapped-types';
import { CreatePeminjamanDto } from './create-peminjaman.dto';
import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';

export class UpdatePeminjamanDto extends PartialType(CreatePeminjamanDto) {
  
  status: string;
  book: Book;
  member: Member;
  Jumlah_Buku: number;
}
