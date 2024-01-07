import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookModule } from './book/book.module';
import { MemberModule } from './member/member.module';
import { PeminjamanModule } from './peminjaman/peminjaman.module';
import { PengembalianModule } from './pengembalian/pengembalian.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';
import { MulterModule } from './multer/multer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123',
      database: 'perpustakaan',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    BookModule,
    MemberModule,
    PeminjamanModule,
    PengembalianModule,
    AuthModule,
    MulterModule,
    JwtModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
