import { Field, ObjectType, Int } from '@nestjs/graphql'
import type { PageInfo as IPageInfo } from "graphql-relay";

// Taken from type-graphql
export interface ClassType<T = any> {
	new(...args: any[]): T;
}

@ObjectType()
export class PageInfo implements IPageInfo {
	@Field(() => String, { nullable: true })
	startCursor: string | null;

	@Field(() => String, { nullable: true })
	endCursor: string | null;

	@Field(() => Boolean)
	hasPreviousPage: boolean;

	@Field(() => Boolean)
	hasNextPage: boolean;
}

export interface RawEdge<NodeType> {
	node: NodeType
}

export interface IEdge<NodeType> extends RawEdge<NodeType> {
	cursor: string
}

function Edge<NodeType>(NodeClass: ClassType<NodeType>) {
	@ObjectType(`${NodeClass.name}Edge`, { isAbstract: true })
	abstract class Edge {
		@Field()
		cursor: string

		@Field(() => NodeClass)
		node: NodeType
	}

	return Edge
}

export interface IConnection<NodeType, EdgeType extends IEdge<NodeType>> {
	edges: EdgeType[]
	nodes: NodeType[]
	pageInfo: PageInfo
	totalCount: number
}

function Connection<NodeType, EdgeType extends IEdge<NodeType>>(
	NodeClass: ClassType<NodeType>,
	EdgeClass: ClassType<EdgeType>
) {
	@ObjectType(`${NodeClass.name}Connection`, { isAbstract: true })
	abstract class Connection {
		@Field(() => Int)
		totalCount: number

		@Field(() => [EdgeClass])
		edges: EdgeType[]

		@Field(() => [NodeClass])
		nodes: NodeType[]

		@Field()
		pageInfo: PageInfo
	}

	return Connection
}

export { Edge, Connection }