import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { StateService } from './states.service';
import { StatesResolver } from './states.resolver';
import { State } from './model/state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([State])],
  providers: [StatesResolver, StateService]
})
export class StatesModule {}
