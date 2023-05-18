import { ArgsType, Field } from '@nestjs/graphql';
import { IsBoolean, IsMongoId, IsEnum } from 'class-validator';
import { MealType } from '~/order/order.schema';

@ArgsType()
export class CreateOrderArgs {
	@Field()
	@IsMongoId()
	recipeId: string;

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	@IsBoolean()
	isVoting: boolean;

	@Field(() => Boolean, { nullable: true, defaultValue: false })
	@IsBoolean()
	isCooking: boolean;

	@Field(() => MealType, { nullable: true })
	@IsEnum(MealType)
	mealType: MealType;
}