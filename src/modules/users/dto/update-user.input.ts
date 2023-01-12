import { InputType, Field, Int } from '@nestjs/graphql';

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  IsBoolean,
  IsDate,
} from 'class-validator';

@InputType()
export class UpdateUserInput {
  @IsInt()
  @IsOptional()
  @Field(() => Int)
  id?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Caracteres Invalidos' })
  @Field()
  name?: string;

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

  @IsBoolean()
  @IsNotEmpty({ message: 'Precisa ser verdadeiro ou falso' })
  @Field({ nullable: true, defaultValue: true })
  active?: boolean;

  @IsDate()
  @Field({ nullable: true })
  updatedAt!: Date
}