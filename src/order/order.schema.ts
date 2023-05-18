import { Field, ObjectType, ID, registerEnumType } from '@nestjs/graphql';
import { modelOptions, prop, ReturnModelType } from '@typegoose/typegoose';
import { NodeRef, TimeMarked, UserRef } from '~/shared/schema';
import { Family } from '~/family/family.schema';
import { Recipe } from '~/recipe/recipe.schema';
import { User } from '~/user/user.schema';

export enum MealType {
	breakfast = 'breakfast',
	lunch = 'lunch',
	dinner = 'dinner',
}
registerEnumType(MealType, { name: 'MealType' })

export enum OrderStatus {
	voting = 'voting',
	cooking = 'cooking',
	completed = 'completed'
}
registerEnumType(OrderStatus, { name: 'OrderStatus' })


@ObjectType()
@modelOptions({
	schemaOptions: {
		timestamps: true
	},
})
export class Order extends TimeMarked {
	@Field(() => ID, { name: 'id' })
	_id: ObjectId;

	@Field(() => Recipe)
	@prop({ required: true, type: () => Recipe })
	recipe: Recipe;

	@Field(() => Family)
	@prop({ required: true, ref: () => Family })
	family: NodeRef<Family>;

	@Field(() => [User])
	@prop({ required: true, ref: () => User, type: () => [String] })
	chefs: UserRef[];

	@Field(() => MealType)
	@prop({ required: true, enum: MealType })
	mealType: MealType;

	@Field(() => OrderStatus)
	@prop({ required: true, enum: OrderStatus })
	orderStatus: OrderStatus

	@Field(() => [User])
	@prop({ required: true, ref: () => User, type: () => [String] })
	voters: UserRef[];

	@prop({ default: null, type: Date })
	deletedAt: Date | null;
}


export type OrderReturnType = ReturnModelType<typeof Order>;