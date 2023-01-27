import { Field, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export class ICity{

  @Field()
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