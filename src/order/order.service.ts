import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Order, OrderReturnType } from './order.schema'
import { QueryMap, QueryOptions, buildQuery, defaultQueryMap } from '~/shared/query-builder'
import { CreateArgs } from '~/shared/schema'

export type QueryOptionsOrder = {
	familyId?: ObjectId
	beforeDate?: Date
	afterDate?: Date
} & QueryOptions

@Injectable()
export class OrderService {
	constructor(
		@InjectModel(Order) private readonly orderModel: OrderReturnType
	) { }

	get model() { return this.orderModel }

	private queryMap: QueryMap<typeof Order, QueryOptionsOrder> = {
		...defaultQueryMap,
		familyId: (query, value) => query.where('family').equals(value),
		beforeDate: (query, value) => query.where('createdAt').lte(value.getTime()),
		afterDate: (query, value) => query.where('createdAt').gte(value.getTime()),
	}

	async findOne(params: QueryOptionsOrder): Promise<Order | null> {
		const query = this.orderModel.findOne()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result ? result.toObject() : null
	}

	async findMany(params: QueryOptionsOrder): Promise<Order[]> {
		const query = this.orderModel.find()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result.map(order => order.toObject())
	}

	async create(params: CreateArgs<Order>): Promise<Order> {
		const order = await this.orderModel.create(params)
		return order.toObject()
	}

	async addVoter(prams: { id: ObjectId, userId: string }): Promise<Order> {
		const order = await this.orderModel.findOneAndUpdate(
			{ _id: prams.id },
			{ $addToSet: { voters: prams.userId } },
			{ new: true }
		)
		return order.toObject()
	}

	async addChef(prams: { id: ObjectId, userId: string }): Promise<Order> {
		const order = await this.orderModel.findOneAndUpdate(
			{ _id: prams.id },
			{ $addToSet: { chefs: prams.userId } },
			{ new: true }
		)
		return order.toObject()
	}
}
