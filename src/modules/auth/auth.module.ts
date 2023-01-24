import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// IMPORTS AUTH
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';

// IMPORTS USER
import { User } from '../users/model/user.entity';
import { UsersService } from '../users/users.service';

// IMPORTS JWT
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

// IMPORTS DOTENV
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: '1d',
        },
      }),
    }),
  ],
  providers: [ AuthService, AuthResolver, UsersService, JwtStrategy ],
  exports: [AuthService]
})
export class AuthModule {}
