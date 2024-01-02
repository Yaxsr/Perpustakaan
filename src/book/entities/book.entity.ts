import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';
import { Pengembalian } from 'src/pengembalian/entities/pengembalian.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'book' })
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ISBN: string;

  @Column()
  Judul_Buku: string;

  @Column()
  Penulis: string;

  @Column()
  Tahun_Terbit: number;

  @Column()
  Synopsis: string;

  @Column()
  Genre: string;

  @Column()
  Lemari: string;

  @Column()
  Jumlah_Buku: number;

  @OneToMany(() => Peminjam, (peminjam) => peminjam.book)
  peminjam: Peminjam[];

  @OneToMany(() => Pengembalian, (pengembalian) => pengembalian.book)
  pengembalian: Pengembalian[];

  @Column({
    type: 'timestamp with time zone', // Sesuaikan dengan tipe data yang mendukung zona waktu
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila'`, // Sesuaikan dengan zona waktu yang diinginkan
  })
  Tanggal_Masuk: string;

  constructor(book: Partial<Book>) {
    Object.assign(this, book);
  }
}
