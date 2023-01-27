import { Injectable, NotFoundException } from '@nestjs/common';
import { Between, Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

// IMPORT STATE
import { State } from './model/state.entity';
import { FilterStateInput } from './dto/filter-state.input';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';

// IMPORT PAGINATE
import { PageInfo } from 'src/modules/pagination/model/pagination.entity';
import { PaginationArgs } from 'src/filters/PaginationArgs';
import Paginate from 'src/utils/Paginate';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(State)
    public stateRepository: Repository<State>
  ){}

  async getStateById(id: number): Promise<State> {
    const state = await this.stateRepository.findOne({ where: { id }});

    if(!state) {
      throw new NotFoundException('Estado não existe!');
    };

    return state;
  };

  async findAllStates(
    { perPage, currentPage }: PaginationArgs,
    filters: FilterStateInput
  ): Promise<any> {
    const [items, count]: any = await this.stateRepository.findAndCount({
      skip: perPage * (currentPage - 1),
      take: perPage,
      where: {
        ...filters.id && { id: filters.id},
        ...filters.name && { name: Like(`%${filters.name}%`)},
        ...filters.uf && { uf: Like(`%${filters.uf}%`)},
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

  async create(data: CreateStateInput): Promise<State> {
    const { active, createdAt, ...rest } = data;

    const createdState = {
      ...rest,
      active: true,
      createdAt: new Date(),
    }

    const state = await this.stateRepository.create(createdState);
    return this.stateRepository.save(state);
  };

  async update(id: number, data: UpdateStateInput): Promise<State>  {
    const { updatedAt, ...rest } = data;

    const state = await this.stateRepository.findOne({ where: { id } });

    if(!state){
      throw new NotFoundException('Estado não existe!');
    }

    const updatedState = {
      ...rest,
      updatedAt: new Date(),
    }

    return this.stateRepository.save({ ...state, ...updatedState});
  };

  async delete(id: number): Promise<State>  {
    const state = await this.stateRepository.findOne({ where: { id } });
    const data = { deletedAt: new Date(), active: false }

    if(!state) {
      throw new NotFoundException('Estado não existe!');
    }

    return this.stateRepository.save({ ...state, ...data });
  }
};