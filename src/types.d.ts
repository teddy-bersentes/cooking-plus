declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

import { User } from './user/user.schema';
import { Types } from 'mongoose';

declare global {
	interface String {
		toObjectId(): ObjectId;
		_id: string;
	}

	type ObjectId = Types.ObjectId;
}