import { ChatCompletionRequestMessage } from 'openai'
import * as recipeParserPrompt from './recipe-parser.json'
import * as recipeGeneratorPrompt from './recipe-generator.json'
import * as pantryItemsFromTextPrompt from './pantry-items-from-text.json'

type PromptVariables = {
	'recipe-parser': {
		recipe: string
	}
	'recipe-generator': {
		title: string
	},
	'pantry-items-from-text': {
		text: string
		existingPantry: string
	}
}

export type Prompt = keyof PromptVariables

const TEMPLATE_MAP: Record<Prompt, string> = {
	'recipe-parser': JSON.stringify(recipeParserPrompt),
	'recipe-generator': JSON.stringify(recipeGeneratorPrompt),
	'pantry-items-from-text': JSON.stringify(pantryItemsFromTextPrompt)
}

export function fillPrompt<T extends Prompt>(params: {
	prompt: T,
	variables: PromptVariables[T]
}): ChatCompletionRequestMessage[] {
	const { variables, prompt } = params
	let filledTemplate = TEMPLATE_MAP[prompt]

	Object.entries(variables)
		.forEach(([key, value]) => {
			const placeholder = `{{${key}}}`;
			filledTemplate = filledTemplate.replace(
				new RegExp(placeholder, 'g'),
				JSON.stringify(value.toString())
					.replace(/"/g, '\\"')
			);
		});


	return JSON.parse(filledTemplate) as ChatCompletionRequestMessage[]
}