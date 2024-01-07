import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';

@Entity()
export class Member {
  @PrimaryColumn()
  nik: string;

  @Column()
  nama_member: string;

  @Column()
  alamat: string;

  @Column()
  email: string;

  @Column({
    type: 'timestamp with time zone', // Sesuaikan dengan tipe data yang mendukung zona waktu
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila'`, // Sesuaikan dengan zona waktu yang diinginkan
  })
  Tanggal_Peminjaman: Date;

  @Column({
    type: 'timestamp with time zone', // Sesuaikan dengan tipe data yang mendukung zona waktu
    default: () => `CURRENT_TIMESTAMP AT TIME ZONE 'Asia/Manila'`, // Sesuaikan dengan zona waktu yang diinginkan
  })
  Tanggal_Registrasi: Date;




  @OneToMany(() => Peminjam, (peminjam) => peminjam.member)
  peminjam: Peminjam[];
  // peminjam: any;
}
