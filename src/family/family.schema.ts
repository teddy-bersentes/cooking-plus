import { Field, ObjectType, ID } from '@nestjs/graphql'
import { modelOptions, prop, ReturnModelType } from '@typegoose/typegoose'
import { TimeMarked, UserRef } from '~/shared/schema'
import { User } from '~/user/user.schema'

@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true
	}
})
export class Family extends TimeMarked {
	@Field(() => ID, { name: 'id' })
	_id: ObjectId

	@Field()
	@prop({ required: true })
	name: string

	@Field(() => [User])
	@prop({ required: true, type: () => [String], default: [] })
	members: UserRef[]

	@prop({ default: null, type: Date })
	deletedAt: Date | null
}

export type FamilyReturnType = ReturnModelType<typeof Family>
