import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
} from '@nestjs/common';
import { PeminjamanService } from './peminjaman.service';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';

@Controller('peminjaman')
export class PeminjamanController {
  constructor(private readonly peminjamanService: PeminjamanService) {}

  // @Post('/add')
  // create(@Body() createPeminjamanDto: CreatePeminjamanDto) {
  //   return this.peminjamanService.createPeminjam(createPeminjamanDto);
  // }

  @Post('/add')
  createPeminjam(@Body() createPeminjamanDto: CreatePeminjamanDto) {
    return this.peminjamanService.createPeminjam(createPeminjamanDto);
  }

  // @Post('/add-buku')
  // async borrowBook(
  //   @Body() borrowData: { ISBN: string; Jumlah_Buku: number },
  // ): Promise<void> {
  //   await this.peminjamanService.borrowBook(
  //     borrowData.ISBN,
  //     borrowData.Jumlah_Buku,
  //   );
  // }

  @Get('/user')
  async getPeminjaman() {
    return this.peminjamanService.getPeminjaman();
  }

  @Get(':id_peminjam')
  async getPeminjamanid(@Param('id_peminjam') id_peminjam: number) {
    const peminjaman =
      await this.peminjamanService.getPeminjamanById(id_peminjam);
    if (!peminjaman) {
      throw new NotFoundException(
        `Peminjam with NIK ${peminjaman} is not found`,
      );
    }
    return peminjaman;
  }

  @Delete('/:id_peminjam')
  async deletePeminjaman(@Param('id_peminjam') id_peminjam: number) {
    return this.peminjamanService.deletePeminjaman(id_peminjam);
  }

  @Put('/update/:id_peminjam')
  async updatePeminjaman(
    @Param('id_peminjam') id_peminjam: number,
    @Body() updatePeminjamanDto: UpdatePeminjamanDto,
  ) {
    try {
      const updatedPeminjaman = await this.peminjamanService.updatePeminjaman(
        id_peminjam,
        updatePeminjamanDto,
      );
      return { success: true, data: updatedPeminjaman };
    } catch (error) {
      throw new NotFoundException(
        `Peminjaman with ID ${id_peminjam} not found.`,
      );
    }
  }
}
