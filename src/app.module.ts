import { Module } from '@nestjs/common';
import { join } from 'path';

// IMPORT DOTENV
import * as dotenv from 'dotenv';
dotenv.config();

// IMPORT GRAPHQL
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

// IMPORT TYPEORM
import { TypeOrmModule } from '@nestjs/typeorm';

// IMPORT ENTITES
import { State } from './modules/states/entities/state.entity'
import { City } from './modules/cities/entities/city.entity'

// IMPORT MODULE
import { StatesModule } from './modules/states/states.module';
import { CitiesModule } from './modules/cities/cities.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema/schema.gql'),
      sortSchema: true,
      debug: false,
      playground: false,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      entities: [State, City],
      synchronize: true,
      logging: true,
    }),
    StatesModule,
    CitiesModule,
  ],
  providers: [],
})
export class AppModule {}
