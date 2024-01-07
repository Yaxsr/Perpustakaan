import {
  Controller,
  Put,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Put('update-member/:nik')
  async updateABook(@Body() data: CreateMemberDto, @Param('nik') nik: string) {
    return this.memberService.updateMember(nik, data);
  }

  @Post('add-member')
  create(@Body() data: CreateMemberDto) {
    return this.memberService.createMember(data);
  }

  @Get('all')
  async findAll() {
    // console.log('tes');
    const data = await this.memberService.findAll();
    return data;
  }

  @Get('/:nik')
  findOne(@Param('nik') nik: string) {
    //console.log("tes")
    return this.memberService.findOne(nik);
  }

  @Put('/update/:nik')
  async update(
    @Param('nik') nik: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    try {
      const updatedMember = await this.memberService.update(
        nik,
        updateMemberDto,
      );
      return { success: true, data: updatedMember };
    } catch (error) {
      throw new NotFoundException(`Peminjaman with ID ${nik} not found.`);
    }
  }

  @Delete('/:nik')
  remove(@Param('nik') nik: string) {
    return this.memberService.remove(nik);
  }
}
