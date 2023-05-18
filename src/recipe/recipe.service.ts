import { Injectable } from '@nestjs/common'
import { InjectModel } from 'nestjs-typegoose'
import { Recipe, RecipeReturnType } from './recipe.schema'
import { QueryMap, QueryOptions, buildQuery, defaultQueryMap } from '~/shared/query-builder'
import { CreateArgs } from '~/shared/schema'
import { ParsedRecipe, fillPrompt } from '~/ai/prompts'
import { AiService } from '~/ai'
import { HttpService } from '@nestjs/axios'
import * as cheerio from 'cheerio'

export type QueryOptionsRecipe = {
	familyId?: ObjectId
} & QueryOptions

@Injectable()
export class RecipeService {
	constructor(
		@InjectModel(Recipe) private readonly recipeModel: RecipeReturnType,
		private readonly aiService: AiService,
		private readonly httpService: HttpService
	) { }

	get model() { return this.recipeModel }

	private queryMap: QueryMap<typeof Recipe, QueryOptionsRecipe> = {
		...defaultQueryMap,
		familyId: (query, value) => query.where('family').equals(value),
	}

	async findOne(params: QueryOptionsRecipe): Promise<Recipe | null> {
		const query = this.recipeModel.findOne()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result ? result.toObject() : null
	}

	async findMany(params: QueryOptionsRecipe): Promise<Recipe[]> {
		const query = this.recipeModel.find()
		buildQuery({ params, query, map: this.queryMap })
		const result = await query.exec()
		return result.map(recipe => recipe.toObject())
	}

	async create(recipe: CreateArgs<Recipe>): Promise<Recipe> {
		const newRecipe = await this.recipeModel.create(recipe)
		return newRecipe.toObject()
	}

	private async textFromUrl(params: { url: string }): Promise<string> {
		const { data: rawHtml } = await this.httpService.axiosRef.get(params.url);
		const $ = cheerio.load(rawHtml);
		$('script, iframe').remove();
		const htmlWithoutImg = $.html().replace(/<(img|iframe)([\w\W]+?)\/?>/gi, '');
		const text = JSON.stringify(
			cheerio
				.load(htmlWithoutImg)('body')
				.text()
				.replace(/\s\s+/g, ' ')
				.trim()
		);
		return text;
	}

	async parseRecipe(params: { url: string }): Promise<ParsedRecipe> {
		const text = await this.textFromUrl({ url: params.url })
		const prompt = fillPrompt({
			prompt: 'recipe-parser',
			variables: {
				recipe: text.substring(1, text.length - 1)
			}
		})
		const completion = await this.aiService.getCompletion({ prompt })
		return JSON.parse(completion) as ParsedRecipe
	}

	async generateRecipe(params: { name: string }): Promise<ParsedRecipe> {
		const prompt = fillPrompt({
			prompt: 'recipe-generator',
			variables: {
				title: params.name
			}
		})
		const completion = await this.aiService.getCompletion({ prompt })
		return JSON.parse(completion) as ParsedRecipe
	}
}
