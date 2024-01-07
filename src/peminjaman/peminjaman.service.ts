import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { Peminjam } from './entities/peminjaman.entity';
import { Repository } from 'typeorm';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { Book } from 'src/book/entities/book.entity';
import { Member } from 'src/member/entities/member.entity';
import { BookService } from 'src/book/book.service';
import { Pengembalian } from 'src/pengembalian/entities/pengembalian.entity';

@Injectable()
export class PeminjamanService {
  constructor(
    @InjectRepository(Pengembalian)
    private readonly pengembalianRepository: Repository<Pengembalian>,
    @InjectRepository(Peminjam)
    private readonly PeminjamanRepo: Repository<Peminjam>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(Book)
    private readonly BookRepo: Repository<Book>,
    private readonly bookService: BookService,
  ) { }
  // async createPeminjam(
  //   createPeminjamanDto: CreatePeminjamanDto,
  // ): Promise<Peminjam> {
  //   const peminjaman = this.PeminjamanRepo.create(createPeminjamanDto);
  //   return this.PeminjamanRepo.save(peminjaman);
  // }

  async borrowBook(ISBN: string, quantity: number): Promise<void> {
    // Call the book service to decrease the book quantity
    await this.bookService.decreaseBookQuantity(ISBN, quantity);
    // Add additional logic for saving borrowing information to the database
  }

  // async createPeminjam(
  //   createPeminjamanDto: CreatePeminjamanDto,
  // ): Promise<Peminjam> {
  //   // Retrieve the book based on the provided ISBN
  //   const book = await this.BookRepo.findOne({
  //     where: { ISBN: createPeminjamanDto.book.ISBN },
  //   });

  //   if (!book) {
  //     // Handle case where the book is not found
  //     throw new NotFoundException('Book not found');
  //   }

  //   console.log('Current Book Quantity:', book.Jumlah_Buku);

  //   // If there is an existing Peminjam with the same ISBN, update the book quantity
  //   const existingPeminjam = await this.PeminjamanRepo.findOne({
  //     where: { book: book },
  //   });

  //   if (existingPeminjam) {
  //     // Calculate the difference in quantity
  //     const quantityDifference =
  //       createPeminjamanDto.Jumlah_Buku - existingPeminjam.Jumlah_Buku;

  //     // Update the book quantity
  //     book.Jumlah_Buku += quantityDifference;
  //   } else {
  //     // If no existing Peminjam, check if there are enough books available
  //     if (book.Jumlah_Buku < createPeminjamanDto.Jumlah_Buku) {
  //       // Handle case where there are not enough books available
  //       throw new BadRequestException('Not enough books available');
  //     }

  //     // Update the book quantity
  //     book.Jumlah_Buku -= createPeminjamanDto.Jumlah_Buku;
  //   }

  //   // Save the changes to the book entity
  //   await this.BookRepo.save(book);
  //   console.log('Updated Book Quantity:', book.Jumlah_Buku);

  //   // Create and save the Peminjam entity
  //   const peminjam = this.PeminjamanRepo.create(createPeminjamanDto);
  //   return this.PeminjamanRepo.save(peminjam);
  // }

  async createPeminjam(
    createPeminjamanDto: CreatePeminjamanDto,
  ): Promise<Peminjam> {
    // Retrieve the book based on the provided ISBN
    const book = await this.BookRepo.findOne({
      where: { ISBN: createPeminjamanDto.book.ISBN },
    });
    if (!book) {
      // Handle case where the book is not found
      throw new NotFoundException('Book not found');
    }

    // Check if there are enough books available
    if (book.Jumlah_Buku < createPeminjamanDto.Jumlah_Buku) {
      // Handle case where there are not enough books available
      throw new BadRequestException('Not enough books available');
    }
    console.log('Current Book Quantity:', book.Jumlah_Buku);
    // Update the quantity of books in the retrieved book entity
    book.Jumlah_Buku -= createPeminjamanDto.Jumlah_Buku;

    // Save the changes to the book entity
    await this.BookRepo.save(book);
    console.log('Updated Book Quantity:', book.Jumlah_Buku);
    // Create and save the Peminjam entity
    const peminjam = this.PeminjamanRepo.create(createPeminjamanDto);
    return this.PeminjamanRepo.save(peminjam);
  }

  async updatePeminjaman(
    id_peminjam: number,
    updatePeminjamanDto: Partial<UpdatePeminjamanDto>,
  ) {
    const peminjam = await this.PeminjamanRepo.findOne({
      where: { id_peminjam: id_peminjam },
      relations: ['book'], // Ensure the book relationship is loaded
    });

    if (!peminjam) {
      throw new NotFoundException(`Peminjam with ID ${id_peminjam} not found`);
    }

    // Store the original quantity for later comparison
    const originalQuantity = peminjam.Jumlah_Buku;

    console.log('Before Update - Peminjam Quantity:', peminjam.Jumlah_Buku);
    // Update Peminjaman fields
    await this.PeminjamanRepo.update(
      { id_peminjam: id_peminjam },
      updatePeminjamanDto,
    );

    console.log('After Update - Peminjam Quantity:', peminjam.Jumlah_Buku);

    // Calculate the quantity difference
    const quantityDifference = peminjam.Jumlah_Buku - originalQuantity;

    // Update the book quantity
    peminjam.book.Jumlah_Buku += quantityDifference;
    console.log('Before Save - Book Quantity:', peminjam.book.Jumlah_Buku);
    // Save the changes to the book entity
    await this.BookRepo.save(peminjam.book);
    console.log('After Save - Book Quantity:', peminjam.book.Jumlah_Buku);
    return {
      message: 'Successfully updated Peminjaman data and Book quantity',
    };
  }

  // async updatePeminjaman(
  //   id_peminjam: number,
  //   updatePeminjamanDto: Partial<UpdatePeminjamanDto>,
  // ) {
  //   const peminjam = await this.PeminjamanRepo.findOne({
  //     where: { id_peminjam: id_peminjam },
  //   });

  //   if (!peminjam) {
  //     throw new NotFoundException(`Book with ID ${id_peminjam} not found`);
  //   }

  //   // Update book fields
  //   await this.PeminjamanRepo.update(
  //     { id_peminjam: id_peminjam },
  //     updatePeminjamanDto,
  //   );

  //   // Update imagePath if a new image is provided

  //   return { message: 'Successfully updated book data' };
  // }

  async getPeminjaman() {
    return this.PeminjamanRepo.query(`SELECT 
    book."Judul_Buku",
      member.nama_member, 
      peminjam.id_peminjam,
      peminjam.id_peminjam, 
      peminjam."Jumlah_Buku", 
      peminjam."memberNik", 
      peminjam.status, 
      peminjam."bookISBN", 
      peminjam."Tanggal_Peminjaman"
    FROM 
      public.peminjam
    JOIN 
      public.member ON peminjam."memberNik" = member.nik
    JOIN 
      public.book ON peminjam."bookISBN" = book."ISBN";
    `)

  }


  async getPeminjamanById(id_peminjam: number): Promise<Peminjam> {
    return this.PeminjamanRepo.findOne({
      where: { id_peminjam },
      relations: ['book', 'member'], // Ganti 'book' dan 'member' dengan nama relasi yang sesuai di entity Anda
    });
  }

  async deletePeminjaman(id_peminjam: number) {
    console.log('Deleting Peminjaman with ID peminjam:', id_peminjam);

    const peminjaman = await this.PeminjamanRepo.findOne({
      where: { id_peminjam },
    });

    if (!peminjaman) {
      throw new NotFoundException(
        `Peminjaman with id ${id_peminjam} not found`,
      );
    }

    const queryResult = this.PeminjamanRepo.query(
      `DELETE FROM peminjam WHERE id_peminjam = $1`,
      [id_peminjam],
    );

    console.log('Deletion Query Result:', queryResult);

    console.log(`Peminjaman with ID ${id_peminjam} has been deleted`);
    return `Peminjaman with ID ${id_peminjam} has been deleted`;
  }
}
