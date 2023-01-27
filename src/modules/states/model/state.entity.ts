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

import { IState } from 'src/interfaces/IState';
import PaginatedResponse from "../../pagination/model/PaginatedResponse";

@ObjectType('State')
@Entity()
export class State extends IState{
  @PrimaryGeneratedColumn('increment')
  @Field()
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  uf: string;

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
export class PaginatedStateResponse extends PaginatedResponse(State) {}