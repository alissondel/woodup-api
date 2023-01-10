import { CreateStateInput } from './create-state.input';
import { InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateStateInput extends PartialType(CreateStateInput) {}
