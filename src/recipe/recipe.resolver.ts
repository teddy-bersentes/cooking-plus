import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Recipe } from './recipe.schema'
import { RecipeService } from './recipe.service'
import { CurrentFamilyId } from '~/shared/auth'

@Resolver(() => Recipe)
export class RecipeResolver {
	constructor(
		private readonly recipeService: RecipeService
	) { }

	@Query(() => [Recipe])
	async recipes(
		@CurrentFamilyId() familyId: ObjectId
	): Promise<Recipe[]> {
		return this.recipeService.findMany({
			isDeleted: false,
			familyId
		})
	}

	@Mutation(() => Recipe)
	async createRecipeFromUrl(
		@Args('url') url: string,
		@CurrentFamilyId() familyId: ObjectId
	): Promise<Recipe> {
		const parsedRecipe = await this.recipeService.parseRecipe({ url })
		const recipe = await this.recipeService.create({
			family: familyId,
			imageUrl: parsedRecipe.imageUrl,
			ingredients: parsedRecipe.ingredients,
			instructions: parsedRecipe.instructions,
			name: parsedRecipe.name,
			preparationTime: parsedRecipe.preparationTime,
			tags: parsedRecipe.tags,
		})
		return recipe
	}

	@Mutation(() => Recipe)
	async createRecipeFromAi(
		@Args('name') name: string,
		@CurrentFamilyId() familyId: ObjectId
	): Promise<Recipe> {
		const generatedRecipe = await this.recipeService.generateRecipe({ name })
		const recipe = await this.recipeService.create({
			family: familyId,
			imageUrl: generatedRecipe.imageUrl,
			ingredients: generatedRecipe.ingredients,
			instructions: generatedRecipe.instructions,
			name: generatedRecipe.name,
			preparationTime: generatedRecipe.preparationTime,
			tags: generatedRecipe.tags
		})
		return recipe
	}
}
