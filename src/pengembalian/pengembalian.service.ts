import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Pengembalian } from './entities/pengembalian.entity';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';
import { Member } from 'src/member/entities/member.entity';
import { Book } from 'src/book/entities/book.entity';
import { UpdatePeminjamanDto } from 'src/peminjaman/dto/update-peminjaman.dto';

@Injectable()
export class PengembalianService {
  createPengembalianDto: any;

  constructor(
    @InjectRepository(Pengembalian)
    private readonly pengembalianRepository: Repository<Pengembalian>,
    @InjectRepository(Peminjam)
    private readonly PeminjamanRepo: Repository<Peminjam>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Book)
    private readonly BookRepo: Repository<Book>,
  ) { }

  // async returnBook(peminjamanId: number, createPengembalianDto: CreatePengembalianDto): Promise<void> {
  //   const peminjam = await this.PeminjamanRepo.findOne({
  //     where: { id_peminjam: peminjamanId },
  //     relations: ['book'],
  //   });

  //   if (!peminjam) {
  //     throw new NotFoundException('Borrowing record not found');
  //   }

  //   const book = peminjam.book;

  //   // Ensure the returned quantity is valid
  //   if (createPengembalianDto.Jumlah_Buku <= 0 || createPengembalianDto.Jumlah_Buku > peminjam.Jumlah_Buku) {
  //     throw new BadRequestException('Invalid returned quantity');
  //   }

  //   // Update the quantity of books in the retrieved book entity
  //   book.Jumlah_Buku += createPengembalianDto.Jumlah_Buku;

  //   // Save the changes to the book entity
  //   await this.BookRepo.save(book);

  //   // Update the status in the Peminjaman entity
  //   const updatePeminjamanDto: UpdatePeminjamanDto = {
  //     status: 'telah dikembalikan',
  //   };

  //   // Update the status of the borrowing record
  //   await this.PeminjamanRepo.update(
  //     { id_peminjam: peminjamanId },
  //     updatePeminjamanDto,
  //   );

  //   // Create and save the Pengembalian entity
  //   const pengembalian = this.pengembalianRepository.create({
  //     book,
  //     peminjam,
  //     Jumlah_Buku : createPengembalianDto.Jumlah_Buku,
  //   });

  //   await this.pengembalianRepository.save(pengembalian);
  // }

  // async returnBook(peminjamanId: number, createPengembalianDto: CreatePengembalianDto): Promise<void> {
  //   // Your existing logic for returning the book

  //   // Update the status in the Peminjaman entity
  //   const updatePeminjamanDto: UpdatePeminjamanDto = {
  //     status: createPengembalianDto.status,
  //   };

  //   // Update the status of the borrowing record
  //   await this.PeminjamanRepo.update(
  //     { id_peminjam: peminjamanId },
  //     updatePeminjamanDto,
  //   );

  //   // Create and save the Pengembalian entity
  //   const pengembalian = this.pengembalianRepository.create({
  //     book,
  //     peminjam,
  //   });

  //   await this.pengembalianRepository.save(pengembalian);

  //   // Delete the Peminjam entity (assuming you want to remove the borrowing record)
  //   // await this.PeminjamanRepo.delete(peminjamanId);
  // }

  async returnBook(peminjamanId: number): Promise<void> {
    // Retrieve the borrowing record based on Peminjam ID
    const peminjam = await this.PeminjamanRepo.findOne({
      where: { id_peminjam: peminjamanId },
      relations: ['book'],
    });

    const checkPengembalian = await this.pengembalianRepository.query(`SELECT *
    FROM public.pengembalian WHERE "peminjamIdPeminjam" = $1`, [peminjamanId])


    if (!peminjam) {
      throw new NotFoundException('Borrowing record not found');
    }
    else if (checkPengembalian.length != 0) {
      throw new BadRequestException('Buku telah dikembalikan');
    }
    console.log(checkPengembalian.length);

    // Retrieve the book associated with the borrowing record
    const book = peminjam.book;

    // Update the quantity of books in the retrieved book entity
    book.Jumlah_Buku += peminjam.Jumlah_Buku;

    // Save the changes to the book entity
    await this.BookRepo.save(book);

    // Update the status in the Peminjaman entity
    const updatePeminjamanDto: UpdatePeminjamanDto = {
      status: "Dikembalikan",
      book: peminjam.book,
      member: peminjam.member,
      Jumlah_Buku: peminjam.Jumlah_Buku,
    };

    // Update the status of the borrowing record
    await this.PeminjamanRepo.update(
      { id_peminjam: peminjamanId },
      updatePeminjamanDto,
    );

    // Create and save the Pengembalian entity
    const pengembalian = this.pengembalianRepository.create({
      book,
      peminjam,

    });

    await this.pengembalianRepository.save(pengembalian);

    // Delete the Peminjam entity (assuming you want to remove the borrowing record)
    // await this.PeminjamanRepo.delete(peminjamanId);
  }

  async findAll() {
    return this.pengembalianRepository.query(`SELECT
    book."Judul_Buku",
    book."ISBN",
    pengembalian."id_pengembalian",
    pengembalian."Tanggal_Pengembalian",
    pengembalian."bookISBN",
    pengembalian."peminjamIdPeminjam",
    member."nama_member"
  FROM
    public.pengembalian
    INNER JOIN book ON book."ISBN" = pengembalian."bookISBN"
    INNER JOIN peminjam ON pengembalian."peminjamIdPeminjam" = peminjam."id_peminjam"
    INNER JOIN member ON peminjam."memberNik" = member."nik";
  `);
  }

  async findOne(id_pengembalian: number): Promise<Pengembalian | undefined> {
    return this.pengembalianRepository.findOne({
      where: { id_pengembalian: id_pengembalian },
    });
  }

  async updatePengembalian(
    id_pengembalian: number,
    updatePengembalianDto: Partial<UpdatePengembalianDto>,
  ) {
    const pengembalian = await this.pengembalianRepository.findOne({
      where: { id_pengembalian: id_pengembalian },
    });

    if (!pengembalian) {
      throw new NotFoundException(
        `Peminjam with ID ${id_pengembalian} not found`,
      );
    }

    // Update book fields
    await this.pengembalianRepository.update(
      { id_pengembalian: id_pengembalian },
      updatePengembalianDto,
    );

    // Update imagePath if a new image is provided

    return { message: 'Successfully updated pengembalian data' };
  }

  async remove(id_pengembalian: number) {
    const pengembalian = await this.findOne(id_pengembalian);
    if (!pengembalian) {
      throw new Error('Pengembalian not found');
    }
    return this.pengembalianRepository.remove(pengembalian);
  }
}
