import { Field, Int, InterfaceType } from "@nestjs/graphql";

@InterfaceType()
export class IUser{

  @Field()
  id: number;

  @Field()
  name: string;

  @Field()
  phoneNumber: string;

  @Field()
  email: string;

  @Field()
  password?: string;

  @Field()
  active: boolean;
  
  @Field()
  createdAt: Date

  @Field({nullable: true})
  updatedAt: Date

  @Field({nullable: true})
  deletedAt: Date
}