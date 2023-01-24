import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

import { User } from './model/user.entity';
import { FilterUserInput } from './dto/filter-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

// IMPORT DOTENV
import * as dotenv from 'dotenv';
dotenv.config();

import * as md5 from "md5";

@Injectable()
export class UsersService  {
  constructor(
    @InjectRepository(User)
    public userRepository: Repository<User>,
  ){}

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({where: {id}});

    if(!user) {
      throw new NotFoundException('Usuario não existe!');
    };
    return user
  };

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}});

    if (!user) {
      throw new NotFoundException('User not found');
    };
    return user;
  }

  async findAllUsers(filters: FilterUserInput): Promise<User[]> {
    return await this.userRepository.find({ 
      where: {
        ...filters.id && { id: filters.id},
        ...filters.name && { name: Like(`%${filters.name}%`)},
        ...filters.phoneNumber && { phoneNumber: Like(`%${filters.phoneNumber}%`)},
        ...filters.email && { email: Like(`%${filters.email}%`)},
        ...filters.password && { password: Like(`%${filters.password}%`)},    
        ...filters.createdAt && {
          createdAt: Between(filters.createdAt, new Date(filters.createdAt.getTime() + (1000 * 3600 * 24 - 1))),
        },
        active: filters.active,
      },
      order: {
        ...filters.order.prefix ? {
            [filters.order.prefix]: {
                [filters.order.key]: filters.order.value
            },
        } : {
            [filters.order.key]: filters.order.value
        },
      },
    });
  };

  async create(data: CreateUserInput): Promise<User> {
    const { password, active, createdAt, ...rest } = data;

    const encryptedPassword = md5(password + process.env.JWT);

    const createdUser = { 
      ...rest,
      password: encryptedPassword,
      active: true,
      createdAt: new Date()
    }

    const user = this.userRepository.create(createdUser);
    return this.userRepository.save(user);
  };

  async update(id: number, data: UpdateUserInput): Promise<User> {
    const { password, updatedAt, ...rest } = data;

    const encryptedPassword = md5(password + process.env.JWT);
    
    const user = await this.userRepository.findOne({ where: { id } });

    if(!user) {
      throw new NotFoundException('Usuario não existe!');
    }

    const updatedUser = {
      ...rest,
      password: encryptedPassword,
      updatedAt: new Date(),
    }

    return this.userRepository.save({ ...user, ...updatedUser });
  };
  
  async delete(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    const data = { deletedAt: new Date(), active: false }

    if(!user) {
      throw new NotFoundException('Usuario não existe!');
    }

    return this.userRepository.save({ ...user, ...data });
  }
};