import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt'
import { Request, Response } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { User } from './entities/auth.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { authUserDTO } from './auth.user.dto';


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly jwtServices: JwtService

  ) {}

  // REGISTER USER
  async registerUser(user: User, resp: Response) {
    const { nama_karyawan, password, id_karyawan } = user;

    // check for required fields
    if (!nama_karyawan?.trim() || !password?.trim() || !id_karyawan.toString().trim()) {
      return resp
        .status(500)
        .send({ message: 'Not all required fields have been filled in.' });
    }

    try {
      const user = await this.userRepository.save({
        nama_karyawan,
        password: await bcrypt.hash(password, 12),
        id_karyawan,
      });

      console.log(user);

      return resp.status(200).send(user);
    } catch (error) {
      console.error(error);

      if (error instanceof QueryFailedError) {
        //@ts-ignore
        if (error.code === '23505') {
          //@ts-ignore
          console.error(`Unique constraint ${error.constraint} failed`);
          return resp
            .status(500)
            .send({ message: 'Ups Sorry, sudah ada user lain dengan id karyawan ini' });
        }
      }

      return resp.status(500).send({ message: error });
    }
  }

  // LOGIN USER
  async loginUser(user: authUserDTO) {


    // check for required fields
    // if (!nama_karyawan?.trim() || !password?.trim()) {
    //   return resp
    //     .status(500)
    //     .send({ message: 'Not all required fields have been filled in.' });
    // }

    // const userDB = await this.userRepository.findOne({ where: {  } });

    try {
      const userDB = await this.userRepository.query(`
        SELECT * FROM public."user" WHERE nama_karyawan = $1
      `, [user.nama_karyawan]);
    
      if (!userDB || userDB.length === 0 || !(await bcrypt.compare(user.password, userDB[0].password))) {
        console.log("Invalid Credentials");

        return {status: false}
  
      }else{
        console.log("valid");
        return {status: true};
      }
    
      // Your code for successful login here
      
    
    } catch (error) {
      console.error(error);
      return { message: "Internal Server Error" };
    }
    // const accessToken = sign({ id: userDB.id_user }, 'access_secret', {
    //   expiresIn: 60 * 60,
    // });

    // const refreshToken = sign({ id: userDB.id_user }, 'refresh_secret', {
    //   expiresIn: 24 * 60 * 60,
    // });
    const jwt = await this.jwtServices.signAsync({username: user.nama_karyawan});
    // resp.cookie('accessToken', jwt, { 
    //   httpOnly: true,
    //   maxAge: 24 * 60 * 60 * 1000, // 1 day
    // });

    return {accessToken: jwt};



    // resp.cookie('refreshToken', refreshToken, {
    //   httpOnly: true,
    //   maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    // });
    // localStorage.setItem('isLoggedIn', 'true');
    // resp.status(200).send({ message: 'Login success.' });
  }

  // AUTH USER
  async authUser(req: Request, resp: Response) {
    try {
      const accessToken = req.cookies['accessToken'];

      const payload: any = verify(accessToken, 'access_secret');

      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const user = await this.userRepository.findOne({
        where: { id_user: payload.id },
      });

      if (!user) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      return resp.status(200).send(user);
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }

  async refreshUser(req: Request, resp: Response) {
    try {
      const refreshToken = req.cookies['refreshToken'];

      const payload: any = verify(refreshToken, 'refresh_secret');

      if (!payload) {
        return resp.status(401).send({ message: 'Unauthenticated.' });
      }

      const accessToken = sign({ id: payload.id }, 'access_secret', {
        expiresIn: 60 * 60,
      });

      resp.cookie('accessToken', accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      resp.status(200).send({ message: 'refresh success.' });
    } catch (error) {
      console.error(error);
      return resp.status(500).send({ message: error });
    }
  }

  async logoutUser(resp: Response) {
    resp.cookie('accessToken', '', { maxAge: 0 });
    resp.cookie('refreshToken', '', { maxAge: 0 });

    return resp.status(200).send({ message: 'logged out.' });
  }
}