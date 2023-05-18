export type ParsedRecipe = {
	name: string
	instructions: string[]
	preparationTime: number // in seconds
	ingredients: string[]
	tags: string[]
	imageUrl: string
}