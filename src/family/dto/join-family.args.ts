import { ArgsType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';

@ArgsType()
export class JoinFamilyArgs {
	@Field(() => String)
	@IsMongoId()
	familyId: string;
}
