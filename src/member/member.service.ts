import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity'; // Pastikan Anda mengganti ini dengan nama entitas yang sesuai

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  async createMember(data: CreateMemberDto) {
    const result = this.memberRepository.create(data);
    console.log(`Success add member`);
    return this.memberRepository.save(result);
  }

  async findAll() {
    // console.log("tes");
    return await this.memberRepository.find();
  }

  async findOne(nik: string): Promise<Member> {
    // Implementasi raw query untuk menemukan anggota berdasarkan NIK
    const query = `SELECT * FROM member WHERE nik = '${nik}'`;
    return await this.memberRepository.query(
      `SELECT * FROM member WHERE nik = '${nik}'`,
    );
  }

  async updateMember(nik: string, data: Partial<CreateMemberDto>) {
    return this.memberRepository.update({ nik }, data);
  }

  async update(nik: string, updateMemberDto: Partial<UpdateMemberDto>) {
    const member = await this.memberRepository.findOne({ where: { nik } });

    if (!member) {
      throw new NotFoundException(`Peminjam with NIk ${nik} not found`);
    }

    // Update book fields
    await this.memberRepository.update({ nik: nik }, updateMemberDto);

    // Update imagePath if a new image is provided

    return { message: 'Successfully updated book data' };
  }

  async remove(nik: string): Promise<void> {
    const result = await this.memberRepository.delete({ nik });

    if (result.affected === 0) {
      throw new NotFoundException(`Member with NIK ${nik} not found`);
    }

    console.log(`Success delete Member with NIK ${nik}`);
  }
}
