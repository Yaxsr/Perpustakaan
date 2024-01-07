import { Book } from 'src/book/entities/book.entity';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';

export class CreatePengembalianDto {
  book: Book;
  peminjam: Peminjam;
  Jumlah_Buku: number;
}
