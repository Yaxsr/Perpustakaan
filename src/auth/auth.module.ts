// auth.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt/dist';


@Module({
  imports: [TypeOrmModule.forFeature([User]),
JwtModule.register({
  secret: 'yasser',
  signOptions: {expiresIn: '1d'}
})], // Import the User entity for TypeORM
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

