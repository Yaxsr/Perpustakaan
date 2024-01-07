import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id_user: number;

  @Column()
  nama_karyawan: string;

  @Column()
  password: string;

  @Column({ unique: true })
  id_karyawan: number;

  @CreateDateColumn()
  createdAt: Date;
}
