import { 
  Field, 
  Int, 
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

@ObjectType('User')
@Entity()
export class User extends IUser {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
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
  @Field()
  password: string;

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