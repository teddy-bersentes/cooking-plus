import './shared/utils/prototype'
import { NestFactory, Reflector } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { AppModule } from './app.module'
import { GraphQLAuthGuard } from './shared/auth/auth.guard'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe()
	)

	app.useGlobalGuards(
		new GraphQLAuthGuard(app.get(Reflector))
	)

	const configService = app.get(ConfigService)
	const port = configService.get('PORT')
	await app.listen(port)
}
bootstrap()
