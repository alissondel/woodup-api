import { Field, ID, InterfaceType } from "type-graphql";

@InterfaceType()
export class ICity{

  @Field(() => ID)
  id: number;

  @Field()
  name: string;
  
  @Field()
  createdAt: Date

  @Field({nullable: true})
  updatedAt: Date

  @Field({nullable: true})
  deletedAt: Date
}