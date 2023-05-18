import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { TypegooseModule } from 'nestjs-typegoose'
import { validateConfig } from './shared/config'
import { AuthStrategy } from './shared/auth/auth.strategy'
import { User, UserModule } from './user'
import { FamilyModule } from './family'
import { RecipeModule } from './recipe'
import { ClsModule } from 'nestjs-cls';
import { OrderModule } from './order'
import { AiModule } from './ai'

@Module({
	imports: [
		ConfigModule.forRoot({
			validate: validateConfig,
			validationOptions: {
				allowUnknown: true,
				abortEarly: true
			},
			isGlobal: true
		}),
		ClsModule.forRoot({
			global: true,
			middleware: {
				mount: true,
				generateId: true
			}
		}),
		HttpModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: 'src/schema.gql',
		}),
		TypegooseModule.forRoot(process.env.DB_URL),
		TypegooseModule.forFeature([User]),
		AiModule,
		UserModule,
		FamilyModule,
		RecipeModule,
		OrderModule
	],
	providers: [
		AuthStrategy,
	],
})
export class AppModule { }
