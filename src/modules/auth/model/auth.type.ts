import { Field, ObjectType } from "@nestjs/graphql";
import { User } from 'src/modules/users/model/user.entity'

@ObjectType()
export class AuthType {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}