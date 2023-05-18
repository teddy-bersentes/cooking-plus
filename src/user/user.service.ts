import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { User, UserReturnType } from './user.schema'
import { QueryMap, QueryOptions, buildQuery, defaultQueryMap } from '~/shared/query-builder'

export type QueryOptionsUser = Omit<QueryOptions, 'id'> & {
	id?: string
	family?: ObjectId
	idIn?: string[]
}

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User) private readonly userModel: UserReturnType
	) { }

	get model() { return this.userModel }

	private queryMap: QueryMap<typeof User, QueryOptionsUser> = {
		isDeleted: (query, value) => value ?
			query.where('deletedAt').ne(null) :
			query.where('deletedAt').equals(null),
		id: (query, value) => query.where('_id').equals(value),
		family: (query, value) => query.where('family').equals(value),
		idIn: (query, value) => query.where('_id').in(value),
	}

	async findOne(params: QueryOptionsUser): Promise<User | null> {
		const query = this.userModel.findOne()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result ? result.toObject() : null
	}

	async findMany(params: QueryOptionsUser): Promise<User[]> {
		const query = this.userModel.find()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result.map(user => user.toObject())
	}

	async create(data: Omit<User, 'createdAt' | 'updatedAt' | 'deletedAt'>): Promise<User> {
		const user = await this.userModel.create(data)
		return user.toObject()
	}
}