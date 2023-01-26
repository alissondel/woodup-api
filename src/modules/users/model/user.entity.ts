import { 
  Field, 
  ObjectType 
} from '@nestjs/graphql';

import { 
  Entity, 
  PrimaryGeneratedColumn, 
  Column, 
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from 'typeorm';

import { IUser } from 'src/interfaces/IUser';
import PaginatedResponse from "../../pagination/model/PaginatedResponse"
@ObjectType('User')
@Entity()
export class User extends IUser {
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column({ name: "phone_number" })
  @Field()
  phoneNumber: string;

  @Column()
  @Field()
  email: string;

  @Column()
  password?: string;

  @Column()
  @Field()
  active: boolean;

  @CreateDateColumn({ name: "created_at" })
  @Field()
  createdAt: Date

  @UpdateDateColumn({ name: "updated_at", nullable: true})
  @Field()
  updatedAt: Date

  @DeleteDateColumn({ name: "deleted_at", nullable: true})
  @Field()
  deletedAt: Date
}

@ObjectType()
export class PaginatedUserResponse extends PaginatedResponse(User) {}