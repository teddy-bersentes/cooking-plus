import { ArgsType, Field, GraphQLISODateTime } from '@nestjs/graphql';

@ArgsType()
export class OrdersArgs {
	@Field(() => GraphQLISODateTime, { nullable: true })
	afterDate?: Date;

	@Field(() => GraphQLISODateTime, { nullable: true })
	beforeDate?: Date;
}