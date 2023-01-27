import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { PaginatedStateResponse, State } from './model/state.entity';
import { StateService } from './states.service';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';
import { FilterStateInput } from './dto/filter-state.input';

//IMPORT JWT-AUTH-GUARD
import { GqlAuthGuard } from '../auth/jwt-auth.guard';
import { PaginationArgs } from 'src/filters/PaginationArgs';

@Resolver('State')
export class StatesResolver {
  constructor(private readonly stateService: StateService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => State)
  async state(@Args('id') id: number): Promise<State> {
    return await this.stateService.getStateById(id);
  };

  @UseGuards(GqlAuthGuard)
  @Query(() => PaginatedStateResponse)
  async states(
    @Args() paginationArgs: PaginationArgs,
    @Args("filters") filters: FilterStateInput,
  ): Promise<PaginatedStateResponse> {
    return await this.stateService.findAllStates(paginationArgs, filters);
  };

  @UseGuards(GqlAuthGuard)
  @Mutation(() => State)
  async createState(@Args('data') data: CreateStateInput): Promise<State> {
    return await this.stateService.create(data);
  };

  @UseGuards(GqlAuthGuard)
  @Mutation(() => State)
  async updateState(
    @Args('id') id: number,
    @Args('data') data: UpdateStateInput): Promise<State> {
    return await this.stateService.update(id, data);
  }

  @Mutation(() => State)
  async deleteState(@Args('id') id: number): Promise<State> {
    return await this.stateService.delete(id);
  }
}
