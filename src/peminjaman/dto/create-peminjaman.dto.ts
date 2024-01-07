import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';

export class CreatePeminjamanDto {

  book: Book;
  member: Member;
  Jumlah_Buku: number;
  status: string;
}
