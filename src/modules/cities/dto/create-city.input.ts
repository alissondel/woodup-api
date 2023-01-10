import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCityInput {
  @Field()
  name: string;

  @Field()
  stateId?: number;
}
