import { Field, Int, InterfaceType } from "type-graphql";

@InterfaceType()
export class IUser{

  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  active: boolean;
  
  @Field()
  createdAt: Date

  @Field({nullable: true})
  updatedAt: Date

  @Field({nullable: true})
  deletedAt: Date
}