import { Module } from '@nestjs/common';

// IMPORT NESTJS GRAPHQL AND TYPEORM
import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

// IMPORT ENTITY
import { State } from './entities/state.entity';

// IMPORT DTO
import { StateDTO } from './dto/state.dto';
import { CreateStateInput } from './dto/create-state.input';
import { UpdateStateInput } from './dto/update-state.input';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([State])],
      resolvers: [{
        DTOClass: StateDTO,
        EntityClass: State,
        CreateDTOClass: CreateStateInput,
        UpdateDTOClass: UpdateStateInput,
        enableTotalCount: true,
        pagingStrategy: PagingStrategies.OFFSET,
      }],
    })
  ],
  providers: [],
})
export class StatesModule {}
