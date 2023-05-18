import { Args, Mutation, Resolver } from '@nestjs/graphql'
import { Family } from './family.schema'
import { FamilyService } from './family.service'
import { CurrentUserId } from '~/shared/auth'
import { JoinFamilyArgs, CreateFamilyArgs } from './dto'
import { UserService, CreateUserInput } from '~/user'
import { NotFoundException } from '@nestjs/common'

@Resolver(() => Family)
export class FamilyResolver {
	constructor(
		private readonly familyService: FamilyService,
		private readonly userService: UserService,
	) { }

	@Mutation(() => Family)
	async joinFamily(
		@CurrentUserId() userId: string,
		@Args('user') userInput: CreateUserInput,
		@Args() args: JoinFamilyArgs,
	): Promise<Family> {
		const family = await this.familyService.findOne({
			id: args.familyId.toObjectId(),
			isDeleted: false
		});

		if (!family) throw new NotFoundException('Family not found');

		const user = await this.userService.create({
			_id: userId,
			family: family._id,
			...userInput,
		})

		const updatedFamily = await this.familyService.addMember({
			familyId: family._id,
			userId: user._id,
		})

		return updatedFamily
	}

	@Mutation(() => Family)
	async createFamily(
		@CurrentUserId() userId: string,
		@Args('user') userInput: CreateUserInput,
		@Args() createFamilyArgs: CreateFamilyArgs,
	): Promise<Family> {
		const family = await this.familyService.create({
			name: createFamilyArgs.name,
			members: [userId],
		});

		await this.userService.create({
			_id: userId,
			family: family._id,
			...userInput,
		});

		return family
	}

}
