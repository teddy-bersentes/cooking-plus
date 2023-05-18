import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class GraphQLAuthGuard extends AuthGuard('jwt') {
	constructor(
		private readonly reflector: Reflector
	) { super() }

	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())
		return isPublic || super.canActivate(context)
	}

	getRequest(context: ExecutionContext) {
		const ctx = GqlExecutionContext.create(context)
		return ctx.getContext().req
	}
}