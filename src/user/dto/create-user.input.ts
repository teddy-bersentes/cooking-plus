import { InputType, Field } from "@nestjs/graphql";
import { IsNotEmpty, IsString, MinLength } from "class-validator";

@InputType()
export class CreateUserInput {
	@Field()
	@IsString()
	@IsNotEmpty()
	name: string;

	@Field()
	@IsString()
	@MinLength(3)
	phoneNumber: string;

	@Field(() => [String], { nullable: true, defaultValue: [] })
	@IsString({ each: true })
	dietaryRestrictions: string[];
}