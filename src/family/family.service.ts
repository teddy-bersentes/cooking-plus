import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Family, FamilyReturnType } from './family.schema'
import { QueryMap, QueryOptions, buildQuery, defaultQueryMap } from '~/shared/query-builder'
import { CreateArgs } from '~/shared/schema'

export type QueryOptionsFamily = QueryOptions

@Injectable()
export class FamilyService {
	constructor(
		@InjectModel(Family) private readonly familyModel: FamilyReturnType
	) { }

	get model() { return this.familyModel }

	private queryMap: QueryMap<typeof Family, QueryOptionsFamily> = {
		...defaultQueryMap
	}

	async findOne(params: QueryOptionsFamily): Promise<Family | null> {
		const query = this.familyModel.findOne()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result ? result.toObject() : null
	}

	async findMany(params: QueryOptionsFamily): Promise<Family[]> {
		const query = this.familyModel.find()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result.map(family => family.toObject())
	}

	async create(params: CreateArgs<Family>): Promise<Family> {
		const family = await this.familyModel.create(params)
		return family.toObject()
	}

	async addMember(params: {
		userId: string
		familyId: ObjectId
	}): Promise<Family> {
		const family = await this.familyModel.findOneAndUpdate(
			{ _id: params.familyId },
			{ $push: { members: params.userId } },
			{ new: true }
		)

		if (!family) throw new Error('Family not found')
		return family.toObject()
	}
}
