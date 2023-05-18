import { Field, ObjectType, ID, Int } from "@nestjs/graphql"
import { modelOptions, prop, ReturnModelType } from "@typegoose/typegoose"
import { NodeRef, TimeMarked } from "~/shared/schema"
import { Family } from "~/family"

@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
export class Recipe extends TimeMarked {
	@Field(() => ID, { name: 'id' })
	_id: string

	@Field()
	@prop({ required: true })
	name: string

	@Field(() => [String])
	@prop({ required: true, type: () => [String] })
	instructions: string[]

	@Field(() => [String])
	@prop({ required: true, type: () => [String] })
	ingredients: string[]

	@Field(() => Int)
	@prop({ required: true, type: Number })
	preparationTime: number // in seconds

	@Field(() => String)
	@prop({ required: true, type: String })
	imageUrl: string

	@Field(() => [String])
	@prop({ required: true, type: () => [String] })
	tags: string[]

	@Field(() => Family)
	@prop({ required: true, ref: () => Family })
	family: NodeRef<Family>

	@prop({ default: null, type: Date })
	deletedAt: Date | null
}


export type RecipeReturnType = ReturnModelType<typeof Recipe>