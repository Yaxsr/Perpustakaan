import {
  Controller,
  Post,
  Body,
  Get,
  Delete,
  Param,
  Put,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { BookService } from './book.service';
import { UpdateBookDto } from './dto/update-book.dto';
import { Response } from 'express';
import { diskStorage } from 'multer';
import * as multer from 'multer'; // Import multer library
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // @Post('/add')
  // async create(@Body() createBookDto: CreateBookDto) {
  //   return this.bookService.createBook(createBookDto);
  // }

  @Post('upload-cover/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination:
          'C:/Users/ASUS/OneDrive/Pictures/31-12-2023 project perpus/library/uploads',
        filename: (req, file, callback) => {
          const id = req.params.id; // Retrieve username from request parameters
          return callback(null, `${id}.jpg`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file, @Param('id') id: string) {
    // Proses file yang diunggah di sini
    console.log('File uploaded successfully', file);
    return { message: 'File uploaded successfully' };
  }

  @Get('get-cover/:filename')
  async serveFile(@Param('filename') filename: string, @Res() res: Response) {
    try {
      const pathGambar =
        'C:/Users/ASUS/OneDrive/Pictures/31-12-2023 project perpus/library/uploads';
      const imagePath = path.join(pathGambar, `${filename}.jpg`);

      if (fs.existsSync(imagePath)) {
        res.setHeader('Content-Type', 'image/jpeg');
        const fileStream = fs.createReadStream(imagePath);
        fileStream.pipe(res);
      } else {
        const imagePathEmpty = path.join(pathGambar, 'empty.jpg');
        res.setHeader('Content-Type', 'image/jpeg');
        const fileStream = fs.createReadStream(imagePathEmpty);
        fileStream.pipe(res);
      }
    } catch (error) {
      console.error('Error serving file', error);
      res.status(500).send('Internal Server Error');
    }
  }

  @Put('update-book/:id')
  async updateABook(@Body() data: CreateBookDto, @Param('id') id: number) {
    return this.bookService.updateBook(id, data);
  }

  @Post('/add-book')
  async addBook(@Body() data: CreateBookDto) {
    return this.bookService.addNewBook(data);
  }

  @Get('/list') // Use @Get decorator for GET endpoint
  async getBooks() {
    return this.bookService.getBooks(); // Assuming you have a method in your service to get books
  }

  @Get(':id')
  async getBookid(@Param('id') bookId: number) {
    const book = await this.bookService.getBookid(bookId);
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    return book;
  }

  @Delete(':id') // :id is a route parameter representing the book ID
  async deleteBook(@Param('id') bookId: number) {
    const deleteCover = this.bookService.deleteFile(`${bookId}.jpg`);
    return this.bookService.deleteBook(bookId);
  }

  @Get('search/:judul')
  async searchBuku(@Param('judul') judul: string) {
    return this.bookService.searchBook(judul);
  }

  // In your BookController
  //   @Put('update-book/:id') // :id is a route parameter representing the book ID
  //   async updateBook(@Param('id') bookId: number, @Body() updateBookDto: UpdateBookDto) {
  //     return this.bookService.updateBookData(bookId, updateBookDto);
  // }
  @Put('update-book/:id')
  @UseInterceptors(FileInterceptor('imagePath'))
  async updateBook(
    @Param('id') bookId: number,
    @Body() updateBookDto: UpdateBookDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.bookService.updateBookData(bookId, updateBookDto, image);
  }

  @Post('/add')
  @UseInterceptors(FileInterceptor('imagePath')) // 'image' is the field name in the form data
  async createBookImage(
    @Body() createBookDto: CreateBookDto,
    @UploadedFile() imagePath: Express.Multer.File,
  ) {
    return this.bookService.createBookImage(createBookDto, imagePath);
  }

  @Post('add-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split('').join('') + '' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }

        cb(null, true);
      },
    }),
  )
  uploadPhoto(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      const response = {
        filePath: `http://localhost:3000/books/image/${file.filename}`,
      };
      console.log(file);
      return response;
    }
  }

  @Get('image/:filename')
  async getImage(@Param('filename') filename, @Res() res: Response) {
    res.sendFile(filename, { root: './uploads' });
  }
}
