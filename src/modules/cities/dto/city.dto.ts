import { FilterableField, FilterableRelation } from '@nestjs-query/query-graphql';
import { ObjectType, Field } from '@nestjs/graphql';
import { ICity } from 'src/interfaces/ICity';
import { StateDTO } from 'src/modules/states/dto/state.dto';

@ObjectType('City')
@FilterableRelation('state', () => StateDTO)
export class CityDTO implements ICity{
  @Field()
  id: number;

  @FilterableField()
  name: string;
  
  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;

  @FilterableField()
  deletedAt: Date;
}
