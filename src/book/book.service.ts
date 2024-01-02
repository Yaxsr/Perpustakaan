import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly BookRepo: Repository<Book>,
  ) {}

  async decreaseBookQuantity(ISBN: string, Jumlah_Buku: number): Promise<void> {
    await this.BookRepo.createQueryBuilder()
      .update(Book)
      .set({ Jumlah_Buku: () => `Jumlah_Buku - ${Jumlah_Buku}` })
      .where('ISBN = :ISBN', { ISBN })
      .execute();
  }

  async increaseBookQuantity(ISBN: string, Jumlah_Buku: number): Promise<void> {
    await this.BookRepo.createQueryBuilder()
      .update(Book)
      .set({ Jumlah_Buku: () => `Jumlah_Buku + ${Jumlah_Buku}` })
      .where('ISBN = :ISBN', { ISBN })
      .execute();
  }

  async addNewBook(data: CreateBookDto) {
    const result = this.BookRepo.create(data);

    return this.BookRepo.save(result);
  }

  async deleteFile(fileName: string): Promise<void> {
    const filePath = path.resolve(
      __dirname,
      '../../uploads',
      fileName,
    );

    // Cek apakah file ada sebelum menghapus
    if (fs.existsSync(filePath)) {
      // Hapus file
      fs.unlinkSync(filePath);
    } else {
      console.log('file not found');
    }
  }

  getBooks() {
    return this.BookRepo.find();
  }
  async deleteBook(bookId: number) {
    const book = await this.BookRepo.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    await this.BookRepo.remove(book);
    return { message: `Successfully delete book with ID ${bookId}` };
  }

  async searchBook(judul: string) {
    return this.BookRepo.query(
      `SELECT * FROM "book" WHERE "Judul_Buku" LIKE '%${judul}%'`,
    );
  }

  async updateBook(id: number, data: Partial<CreateBookDto>) {
    return this.BookRepo.update({ id }, data);
  }

  async updateBookData(
    bookId: number,
    updateBookDto: Partial<UpdateBookDto>,
    image: Express.Multer.File,
  ) {
    const book = await this.BookRepo.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    // Update book fields
    await this.BookRepo.update({ id: bookId }, updateBookDto);

    return { message: 'Successfully updated book data' };
  }

  async getBookid(id: number) {
    return this.BookRepo.findOne({ where: { id: id } });
  }

  async createBookImage(
    createBookDto: CreateBookDto,
    image: Express.Multer.File,
  ) { }
}
