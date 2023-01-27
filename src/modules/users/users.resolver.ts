import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

//IMPORTS USER
import { PaginatedUserResponse, User } from './model/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterUserInput } from './dto/filter-user.input';

//IMPORT JWT-AUTH-GUARD
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationArgs } from 'src/filters/PaginationArgs';
@Resolver('User')
export class UsersResolver {
  constructor(private readonly UserService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return await this.UserService.getUserById(id);
  };

  @UseGuards(GqlAuthGuard)
  @Query(() => User)
  async userByEmail(@Args('email') email: string): Promise<User> {
    return await this.UserService.getUserByEmail(email);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedUserResponse)
  async users(
    @Args() paginationArgs: PaginationArgs,
    @Args("filters") filters: FilterUserInput,
  ): Promise<PaginatedUserResponse> {
    return await this.UserService.findAllUsers(paginationArgs, filters);
  };

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return await this.UserService.create(data);
  };

  @UseGuards(GqlAuthGuard)
  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return await this.UserService.update(id, data);
  };

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number): Promise<User> {
    return await this.UserService.delete(id);
  };
}
