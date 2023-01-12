import { 
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Between, Like, Repository } from 'typeorm';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './model/user.entity';

import { FilterUserInput } from './dto/filter-user.input';


@Injectable()
export class UsersService  {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ){}

  async getUserById(id: any): Promise<User> {
    const user = await this.userRepository.findOne(id);

    if(!user) {
      throw new NotFoundException('Usuario não existe!');
    }
    return user
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
  }

  async createUser(data: CreateUserInput): Promise<User> {
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async updateUser(data: UpdateUserInput): Promise<User> {
    const user = await this.getUserById(data.id);
    return this.userRepository.save({ ...user, ...data });
  }

  async deleteUser(id: number): Promise<void> {
    const user = await this.getUserById(id);
    const userDeleted = await this.userRepository.delete(user);

    if (!userDeleted) {
      throw new InternalServerErrorException();
    }
  }

}
