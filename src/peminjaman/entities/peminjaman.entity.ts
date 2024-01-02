import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';
import { Pengembalian } from 'src/pengembalian/entities/pengembalian.entity';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class Peminjam {
  @PrimaryGeneratedColumn()
  id_peminjam: number;

  @ManyToOne(() => Member, (member) => member.peminjam, { onDelete: 'CASCADE' })
  @JoinColumn()
  member: Member;

  @ManyToOne(() => Book, (book) => book.peminjam, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bookISBN', referencedColumnName: 'ISBN' })
  book: Book;

  @Column({
    type: 'timestamp with time zone', // Sesuaikan dengan tipe data yang mendukung zona waktu
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila'`, // Sesuaikan dengan zona waktu yang diinginkan
  })
  Tanggal_Peminjaman: Date;

  @Column()
  Jumlah_Buku: number;

  // @ManyToOne(() => Pengembalian, (pengembalian) => pengembalian.peminjam)
  // @JoinColumn({ name: 'pengembalianId' })
  // pengembalian: Pengembalian;
  @OneToMany(() => Pengembalian, (pengembalian) => pengembalian.peminjam)
  @JoinColumn({ name: 'peminjamId' }) // Specify the column name
  pengembalian: Pengembalian[];
  
  @Column()
  status: string;
}
