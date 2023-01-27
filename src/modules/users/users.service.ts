import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';

// IMPORT USERS
import { User } from './model/user.entity';
import { FilterUserInput } from './dto/filter-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';

// IMPORT PAGINATE
import { PageInfo } from 'src/modules/pagination/model/pagination.entity';
import { PaginationArgs } from 'src/filters/PaginationArgs';
import Paginate from 'src/utils/Paginate';

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

  async findAllUsers(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterUserInput
    ): Promise<any> {
    const [items, count]: any = await this.userRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage, 
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
        [filters.order.key]: filters.order.value
      },
    });

    const pagination: PageInfo = await Paginate(count, perPage, currentPage);

    return {
      items,
      pagination,
    }
  };

  async create(data: CreateUserInput): Promise<User> {
    const { password, active, createdAt, ...rest } = data;

    const encryptedPassword = md5(password + process.env.JWT);

    const createdUser = { 
      ...rest,
      password: encryptedPassword,
      active: true,
      createdAt: new Date(),
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