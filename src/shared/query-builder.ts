import { ReturnModelType } from "@typegoose/typegoose";
import { AnyParamConstructor } from "@typegoose/typegoose/lib/types";
import { QueryOptionsUser } from "~/user/user.service";

export type QueryMap<
	// The model type
	M extends AnyParamConstructor<any>,
	// The query options
	O extends Record<string, any>
> = {
		[K in keyof Required<O>]: (
			query: ReturnType<ReturnModelType<M>["findOne"]> | ReturnType<ReturnModelType<M>["find"]> | ReturnType<ReturnModelType<M>["countDocuments"]>,
			value: O[K]
		) => void;
	}

export const buildQuery = <
	M extends AnyParamConstructor<any>,
	O extends Record<string, any>
>(
	input: {
		params: O,
		query: ReturnType<ReturnModelType<M>["findOne"]> | ReturnType<ReturnModelType<M>["find"]> | ReturnType<ReturnModelType<M>["countDocuments"]>,
		map: QueryMap<M, O>
	}
) => {
	const { params, query, map: queryBuilders } = input;
	Object.entries(params).forEach(([key, value]) => {
		const builder = queryBuilders[key as keyof QueryOptionsUser];
		if (builder && value !== undefined) {
			builder(query, value);
		}
	});
}

export type QueryOptions = {
	isDeleted?: boolean,
	id?: ObjectId
}

export const defaultQueryMap: QueryMap<any, QueryOptions> = {
	isDeleted: (query, value) => value ?
		query.where('deletedAt').ne(null) :
		query.where('deletedAt').equals(null),
	id: (query, value) => query.where('_id').equals(value)
}