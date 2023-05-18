import { ConnectionArgs } from './connection.args'
import * as Relay from 'graphql-relay'
import { IConnection, IEdge } from './types'

type PagingMeta =
	| { pagingType: 'forward'; after?: string; first: number }
	| { pagingType: 'backward'; before?: string; last: number }
	| { pagingType: 'none' }

function getMeta({
	first = 0,
	last = 0,
	after,
	before,
}: ConnectionArgs): PagingMeta {
	const isForwardPaging = !!first || !!after
	const isBackwardPaging = !!last || !!before

	return isForwardPaging
		? { pagingType: 'forward', after, first }
		: isBackwardPaging
			? { pagingType: 'backward', before, last }
			: { pagingType: 'none' }
}

export function getConnectionArgs(args: ConnectionArgs): {
	limit: number
	offset: number
} {
	const defaultLimit = 30
	const defaultOffset = 0

	const meta = getMeta(args)
	switch (meta.pagingType) {
		case 'forward': {
			let offset = 0
			if (meta.after) {
				offset = Relay.cursorToOffset(meta.after) + 1
			}

			if (isNaN(offset)) throw new Error('invalid after query')

			return { limit: meta.first, offset }
		}
		case 'backward': {
			const { last, before } = meta
			let limit = last
			let offset = Relay.cursorToOffset(before!) - last

			if (isNaN(offset)) throw new Error('invalid before query')

			if (offset < 0) {
				limit = Math.max(last + offset, 0)
				offset = 0
			}

			return { offset, limit }
		}
		default:
			return {
				limit: defaultLimit,
				offset: defaultOffset
			}
	}
}

export async function buildConnection<T>(params: {
	args: ConnectionArgs,
	nodes: T[],
	totalCount: number
}): Promise<IConnection<T, IEdge<T>>> {
	const { args, nodes, totalCount } = params
	const { offset } = getConnectionArgs(args)

	const connection = Relay.connectionFromArraySlice(
		nodes,
		args,
		{
			arrayLength: totalCount,
			sliceStart: offset || 0,
		}
	)

	return {
		edges: connection.edges,
		pageInfo: connection.pageInfo,
		nodes,
		totalCount,
	}
}
