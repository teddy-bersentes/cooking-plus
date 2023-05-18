import { SetMetadata } from '@nestjs/common';
import { createParamDecorator } from "@nestjs/common";
import { ClsServiceManager } from 'nestjs-cls'
import { User } from "~/user";

/*
The reason for having the separate decorators, and the use of `ClsServiceManager` is to
allow for users that are not in the DB to be authenticated, and for methods to still access user info.

This also allows us to circumvent having to make the user model `family` field nullable, which saves us
a lot of headaches and plumbing in our code. Normally these "not found" errors would be thrown in the `validate` 
method of the `AuthStrategy`, but we can still throw them here after getting the data from cls.
*/

export const CurrentUser = createParamDecorator(
	(): User => {
		const user = ClsServiceManager.getClsService().get('user')
		if (!user) throw new Error('No user found in request context')
		return user
	}
)

export const CurrentUserId = createParamDecorator(
	async (): Promise<string> => {
		const userId = ClsServiceManager.getClsService().get('userId')
		if (!userId) throw new Error('No user ID found in request context')
		return userId
	}
)

export const CurrentFamilyId = createParamDecorator(
	async (): Promise<ObjectId> => {
		const user: User = ClsServiceManager.getClsService().get('user')
		if (!user) throw new Error('No user found in request context')
		return user.family._id
	}
)

export const Public = () => SetMetadata('isPublic', true);