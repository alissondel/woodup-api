import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Imports User
import { User } from 'src/modules/users/model/user.entity';
import { UsersService } from 'src/modules/users/users.service';

// Imports Auth
import { AuthInput } from './dto/auth.input';
import { AuthType } from './model/auth.type';

// Import MD5
import * as md5 from "md5";

// IMPORTS DOTENV
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(data: AuthInput): Promise<AuthType> {
    const user = await this.userService.getUserByEmail(data.email);

    if(md5(data.password + process.env.JWT) != user.password) {
      throw new UnauthorizedException('Senha Incorreta');
    };

    const token = await this.jwtToken(user);

    return {
      user,
      token,
    }
  }

  private async jwtToken(user: User): Promise<string> {
    const payload = { 
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    };
    
    return this.jwtService.signAsync(payload);
  }
}
