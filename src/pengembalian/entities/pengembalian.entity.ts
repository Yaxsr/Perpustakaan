import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';
import { Book } from 'src/book/entities/book.entity';

@Entity()
export class Pengembalian {
  @PrimaryGeneratedColumn()
  id_pengembalian: number;

  @Column({
    type: 'timestamp with time zone', // Sesuaikan dengan tipe data yang mendukung zona waktu
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila'`, // Sesuaikan dengan zona waktu yang diinginkan
  })
  Tanggal_Pengembalian: Date;



  @ManyToOne(() => Book, (book) => book.pengembalian, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookISBN', referencedColumnName: 'ISBN' })
  book: Book;

  @ManyToOne(() => Peminjam, (peminjaman) => peminjaman.pengembalian)
  peminjam: Peminjam;
  // @ManyToOne(() => Peminjam, (peminjam) => peminjam.pengembalian)
  // @JoinColumn({ name: 'peminjamanId' })
  // peminjam: Peminjam;
}
