import { Resolver, Query } from '@nestjs/graphql'
import { CurrentUser } from '~/shared/auth'
import { User, UserService } from '~/user'

@Resolver(() => User)
export class UserResolver {
	constructor(
		private readonly userService: UserService,
	) { }

	// TODO
}
