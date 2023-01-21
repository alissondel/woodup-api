import { InputType, Field, Int } from '@nestjs/graphql';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,

} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name?: string;

  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  phoneNumber?: string;

  @IsOptional()
  @IsEmail()
  @IsNotEmpty({ message: 'Invalid E-mail' })
  @Field()
  email?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @Field()
  password?: string;

  // @IsDate()
  // @Field({ nullable: true })
  // updatedAt!: Date
}