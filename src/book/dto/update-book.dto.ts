import { PartialType } from '@nestjs/swagger';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto extends PartialType(CreateBookDto) {
  // Define the properties you want to update here
  readonly id: number;
  readonly Judul_Buku: string;
  readonly Penulis: string;
  readonly Tahun_Terbit: number;
  readonly Synopsis: string;
  readonly Genre: string;
  readonly Lemari: string;
  readonly Jumlah_Buku: number;
  // Add other properties as needed
}
