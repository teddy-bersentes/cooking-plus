import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Config } from '~/shared/config';
import { passportJwtSecret } from 'jwks-rsa';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserReturnType } from '~/user';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
	constructor(
		@InjectModel(User) private readonly userModel: UserReturnType,
		private readonly configService: ConfigService<Config>,
		private readonly clsService: ClsService,
	) {
		super({
			session: false,
			secretOrKeyProvider: passportJwtSecret({
				cache: true,
				rateLimit: true,
				jwksRequestsPerMinute: 5,
				jwksUri: `${configService.getOrThrow('AUTH0_ISSUER_URL')}.well-known/jwks.json`
			}),
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			audience: configService.getOrThrow('AUTH0_AUDIENCE'),
			issuer: configService.getOrThrow('AUTH0_ISSUER_URL'),
			algorithms: ['RS256']
		});
	}

	async validate(payload: { sub: string }): Promise<User | {}> {
		this.clsService.set('userId', payload.sub)

		const user = await this.userModel.findById(payload.sub)
		if (!user) return {} // see /src/shared/auth/auth.decorators.ts

		this.clsService.set('user', user)
		return user
	}
}
