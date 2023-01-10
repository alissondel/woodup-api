import { Module } from '@nestjs/common';

// IMPORT NESTJS GRAPHQL AND TYPEORM
import { NestjsQueryGraphQLModule, PagingStrategies } from '@nestjs-query/query-graphql';
import { NestjsQueryTypeOrmModule } from '@nestjs-query/query-typeorm';

// IMPORT ENTITY
import { City } from './entities/city.entity';

// IMPORT DTO
import { CityDTO } from './dto/city.dto';
import { CreateCityInput } from './dto/create-city.input';
import { UpdateCityInput } from './dto/update-city.input';

// import { CitiesService } from './cities.service';
// import { CitiesResolver } from './cities.resolver';

@Module({
  imports: [
    NestjsQueryGraphQLModule.forFeature({
      imports: [NestjsQueryTypeOrmModule.forFeature([City])],
      resolvers: [{
        DTOClass: CityDTO,
        EntityClass: City,
        CreateDTOClass: CreateCityInput,
        UpdateDTOClass: UpdateCityInput,
        enableTotalCount: true,
        pagingStrategy: PagingStrategies.OFFSET,
      }],
    })
  ],
  providers: []
})
export class CitiesModule {}
