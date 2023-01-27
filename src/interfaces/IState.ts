import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType()
export class IState{

  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  uf: string;

  @Field()
  active: boolean;

  @Field()
  createdAt: Date

  @Field({nullable: true})
  updatedAt: Date

  @Field({nullable: true})
  deletedAt: Date
}