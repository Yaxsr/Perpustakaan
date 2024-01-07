import { PartialType } from '@nestjs/mapped-types';
import { CreatePengembalianDto } from './create-pengembalian.dto';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';
import { Book } from 'src/book/entities/book.entity';

export class UpdatePengembalianDto extends PartialType(CreatePengembalianDto) {

}
