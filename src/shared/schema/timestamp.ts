import { Field, GraphQLISODateTime, ObjectType } from "@nestjs/graphql";
import { prop } from "@typegoose/typegoose";

@ObjectType({ isAbstract: true })
export class TimeMarked {
	@Field(() => GraphQLISODateTime)
	@prop({ default: Date.now, type: Date, required: true })
	createdAt: Date;

	@Field(() => GraphQLISODateTime)
	@prop({ default: Date.now, type: Date, required: true })
	updatedAt: Date;
}