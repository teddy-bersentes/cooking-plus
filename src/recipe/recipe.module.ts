import { Module } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { RecipeResolver } from './recipe.resolver'
import { RecipeService } from './recipe.service'
import { Recipe } from './recipe.schema'
import { AiModule } from '~/ai'
import { HttpModule } from '@nestjs/axios'

@Module({
	imports: [
		TypegooseModule.forFeature([Recipe]),
		HttpModule,
		AiModule
	],
	providers: [RecipeResolver, RecipeService],
	exports: [RecipeService],
})
export class RecipeModule { }
