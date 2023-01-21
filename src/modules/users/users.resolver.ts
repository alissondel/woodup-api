import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';

import { User } from './model/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FilterUserInput } from './dto/filter-user.input';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly UserService: UsersService) {}

  @Query(() => User)
  async user(@Args('id') id: number): Promise<User> {
    return this.UserService.getUserById(id);
  };

  @Query(() => [User])
  async users(
    @Args("filters") filters: FilterUserInput,
  ): Promise<User[]> {
    return await this.UserService.findAllUsers(filters);
  };

  @Mutation(() => User)
  async createUser(@Args('data') data: CreateUserInput): Promise<User> {
    return this.UserService.create(data);
  };

  @Mutation(() => User)
  async updateUser(
    @Args('id') id: number,
    @Args('data') data: UpdateUserInput,
  ): Promise<User> {
    return this.UserService.update(id, data);
  };

  @Mutation(() => User)
  async deleteUser(@Args('id') id: number): Promise<User> {
    return await this.UserService.delete(id);
  };
}
