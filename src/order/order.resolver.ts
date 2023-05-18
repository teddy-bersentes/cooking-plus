import { Args, Mutation, Resolver, ResolveField, Int, Parent, Query } from '@nestjs/graphql'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { Order, OrderStatus } from './order.schema'
import { OrderLoader } from './order.loader'
import { CreateOrderArgs, OrdersArgs } from './dto'
import { OrderService } from './order.service'
import { RecipeService } from '~/recipe'
import { CurrentFamilyId, CurrentUserId } from '~/shared/auth'
import { User } from '~/user'

@Resolver(() => Order)
export class OrderResolver {
	constructor(
		private readonly orderService: OrderService,
		private readonly orderLoader: OrderLoader,
		private readonly recipeService: RecipeService,
	) { }

	@Mutation(() => Order)
	async createOrder(
		@Args() args: CreateOrderArgs,
		@CurrentFamilyId() familyId: ObjectId,
		@CurrentUserId() userId: string
	): Promise<Order> {
		const recipe = await this.recipeService.findOne({
			id: args.recipeId.toObjectId(),
			familyId,
			isDeleted: false
		})

		if (!recipe) throw new NotFoundException('Recipe not found')

		if (!args.isCooking && !args.isVoting) {
			throw new BadRequestException('Order must be either cooking or voting')
		}

		const order = await this.orderService.create({
			recipe,
			family: familyId,
			chefs: args.isCooking ? [userId] : [],
			voters: args.isVoting ? [userId] : [],
			mealType: args.mealType,
			orderStatus: args.isCooking ? OrderStatus.cooking : OrderStatus.voting
		})

		return order
	}

	@Mutation(() => Order)
	async voteForOrder(
		@Args('orderId') orderId: string,
		@CurrentUserId() userId: string
	): Promise<Order> {
		const order = await this.orderService.addVoter({
			id: orderId.toObjectId(),
			userId
		})

		return order
	}

	@Mutation(() => Order)
	async cookForOrder(
		@Args('orderId') orderId: string,
		@CurrentUserId() userId: string
	): Promise<Order> {
		const order = await this.orderService.addChef({
			id: orderId.toObjectId(),
			userId
		})

		return order
	}

	@Query(() => [Order])
	async orders(
		@Args() args: OrdersArgs,
		@CurrentFamilyId() familyId: ObjectId
	): Promise<Order[]> {
		const orders = await this.orderService.findMany({
			familyId,
			beforeDate: args.beforeDate,
			afterDate: args.afterDate,
			isDeleted: false
		})

		return orders
	}

	@ResolveField(() => [User])
	async voters(@Parent() order: Order): Promise<User[]> {
		return this.orderLoader.batchUsers.load(order.voters)
	}

	@ResolveField(() => Int)
	async voteCount(@Parent() order: Order): Promise<number> {
		return order.voters.length
	}

	@ResolveField(() => Boolean)
	async hasViewerVoted(
		@Parent() order: Order,
		@CurrentUserId() userId: string
	): Promise<boolean> {
		return order.voters.includes(userId)
	}

	@ResolveField(() => [User])
	async chefs(@Parent() order: Order): Promise<User[]> {
		return this.orderLoader.batchUsers.load(order.chefs)
	}

	@ResolveField(() => Int)
	async chefCount(@Parent() order: Order): Promise<number> {
		return order.chefs.length
	}

	@ResolveField(() => Boolean)
	async isViewerCooking(
		@Parent() order: Order,
		@CurrentUserId() userId: string
	): Promise<boolean> {
		return order.chefs.includes(userId)
	}
}
