import { FilterableField, FilterableOffsetConnection } from '@nestjs-query/query-graphql';
import { ObjectType, Field } from '@nestjs/graphql';
import { IState } from 'src/interfaces/IState';
import { CityDTO } from 'src/modules/cities/dto/city.dto';

@ObjectType('State')
@FilterableOffsetConnection('cities', () => CityDTO, { nullable: true })
export class StateDTO implements IState{
  @Field()
  id: number;

  @FilterableField()
  name: string;

  @FilterableField()
  uf: string;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;

  @FilterableField()
  deletedAt: Date;
}
