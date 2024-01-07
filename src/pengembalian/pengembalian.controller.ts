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
import { PengembalianService } from './pengembalian.service';
import { CreatePengembalianDto } from './dto/create-pengembalian.dto';
import { UpdatePengembalianDto } from './dto/update-pengembalian.dto';
import { Pengembalian } from './entities/pengembalian.entity';
import { Peminjam } from 'src/peminjaman/entities/peminjaman.entity';

@Controller('pengembalian')
export class PengembalianController {
  constructor(private readonly pengembalianService: PengembalianService) {}

  // @Post('/return')
  // async returnBook(@Body() createPengembalianDto: CreatePengembalianDto): Promise<void> {
  //   // Extract the necessary information from createPengembalianDto
  //   const peminjamanId = createPengembalianDto.peminjamanId; // Adjust based on your DTO structure

  //   await this.pengembalianService.returnBook(peminjamanId, createPengembalianDto);
  // }

  // @Post()
  // async returnBook(@Body() createPengembalianDto: CreatePengembalianDto) {
  //   return this.pengembalianService.returnBook(createPengembalianDto);
  // }

  // @Post('/return/:peminjamId')
  // async returnBook(
  //   @Param('peminjamId') peminjamId: number,
  //   @Body() createPengembalianDto: CreatePengembalianDto,
  // ): Promise<void> {
  //   await this.pengembalianService.returnBook(
  //     peminjamId,
  //     createPengembalianDto,
  //   );
  // }

  // @Post('/return/:peminjamanId')
  // async returnBook(
  //   @Param('peminjamanId') peminjamanId: number,
  //   @Body() createPengembalianDto: CreatePengembalianDto,
  // ): Promise<void> {
  //   await this.pengembalianService.returnBook(
  //     peminjamanId,
  //     createPengembalianDto,
  //   );
  // }

  @Post('/return/:peminjamId')
  async returnBook(@Param('peminjamId') peminjamanId: number): Promise<void> {
    await this.pengembalianService.returnBook(peminjamanId);
  }

  @Get('/all')
  findAll() {
    return this.pengembalianService.findAll();
  }

  @Get('by/:id_pengembalian') // Update the parameter name here
  findOne(@Param('id_pengembalian') id_pengembalian: string) {
    return this.pengembalianService.findOne(+id_pengembalian);
  }

  @Put('/update/:id_pengembalian')
  async updatePengembalian(
    @Param('id_pengembalian') id_pengembalian: number,
    @Body() updatePengembalianDto: UpdatePengembalianDto,
  ) {
    try {
      const updatedPengembalian =
        await this.pengembalianService.updatePengembalian(
          id_pengembalian,
          updatePengembalianDto,
        );
      return { success: true, data: updatedPengembalian };
    } catch (error) {
      throw new NotFoundException(
        `Peminjaman with ID ${id_pengembalian} not found.`,
      );
    }
  }
  @Delete('Delete/:id_pengembalian') // Update the parameter name here
  remove(@Param('id_pengembalian') id_pengembalian: number) {
    return this.pengembalianService.remove(+id_pengembalian);
  }
}
