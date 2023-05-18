import { Field, ObjectType, ID } from "@nestjs/graphql"
import { modelOptions, prop, ReturnModelType } from "@typegoose/typegoose"
import { TimeMarked, NodeRef } from "~/shared/schema"
import { Family } from "~/family/family.schema"

@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
export class User extends TimeMarked {
	@Field(() => ID, { name: 'id' })
	@prop({ required: true })
	_id: string

	@Field()
	@prop({ required: true })
	name: string;

	@Field()
	@prop({ required: true, unique: true })
	phoneNumber: string

	@Field(() => Family)
	@prop({ required: true, ref: () => Family })
	family: NodeRef<Family>

	@Field(() => [String])
	@prop({ required: true, type: () => [String], default: [] })
	dietaryRestrictions: string[]

	@prop({ default: null, type: Date })
	deletedAt: Date | null
}

export type UserReturnType = ReturnModelType<typeof User>