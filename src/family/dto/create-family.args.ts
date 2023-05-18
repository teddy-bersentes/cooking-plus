import { IsNotEmpty, IsString } from 'class-validator';
import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateFamilyArgs {
	@Field()
	@IsString()
	@IsNotEmpty()
	name: string;
}
