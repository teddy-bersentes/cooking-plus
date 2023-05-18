import { ValidateIf, Validate, ValidatorConstraintInterface, ValidationArguments, ValidatorConstraint, Min } from 'class-validator'
import { Field, ArgsType, Int } from '@nestjs/graphql'
import * as Relay from 'graphql-relay'

@ValidatorConstraint({ async: false })
export class ObjectMustContain implements ValidatorConstraintInterface {
	validate(_: any, args: ValidationArguments) {
		const object = args.object as any;
		const required = args.constraints[0] as string;
		return object[required] !== undefined;
	}

	defaultMessage(args: ValidationArguments) {
		return `Cannot be used without \`${args.constraints[0]}\`.`;
	}
}

@ValidatorConstraint({ async: false })
export class ObjectMustNotContain implements ValidatorConstraintInterface {
	validate(_: any, args: ValidationArguments) {
		const object = args.object as any;
		const result = args.constraints.every(propertyName => {
			return object[propertyName] === undefined;
		});
		return result;
	}

	defaultMessage(args: ValidationArguments) {
		return `Cannot be used with \`${args.constraints.join("` , `")}\`.`;
	}
}

@ArgsType()
export class ConnectionArgs implements Relay.ConnectionArguments {
	@Field({ nullable: true })
	@ValidateIf(o => o.before !== undefined)
	@Validate(ObjectMustContain, ['last'])
	@Validate(ObjectMustNotContain, ['first', 'after'])
	before?: Relay.ConnectionCursor

	@Field({ nullable: true })
	@ValidateIf(o => o.after !== undefined)
	@Validate(ObjectMustContain, ['first'])
	@Validate(ObjectMustNotContain, ['last', 'before'])
	after?: Relay.ConnectionCursor

	@Field(() => Int, { nullable: true })
	@ValidateIf(o => o.first !== undefined)
	@Min(1)
	@Validate(ObjectMustNotContain, ['last', 'before'])
	first?: number

	@Field(() => Int, { nullable: true })
	@ValidateIf(o => o.last !== undefined)
	@Min(1)
	@Validate(ObjectMustNotContain, ['first', 'after'])
	@Validate(ObjectMustContain, ['before'])
	last?: number
}