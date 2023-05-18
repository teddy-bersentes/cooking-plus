import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai'
import { Config } from "~/shared/config";
import { HttpService } from "@nestjs/axios";

@Injectable()
export class AiService {
	private openai: OpenAIApi

	constructor(
		private readonly configService: ConfigService<Config>,
	) {
		const config = new Configuration({
			apiKey: this.configService.get('OPENAI_API_KEY')
		})
		this.openai = new OpenAIApi(config)
	}

	async getCompletion(params: {
		prompt: ChatCompletionRequestMessage[],
		model?: 'gpt-4' | 'gpt-3.5-turbo'
	}): Promise<string> {
		const { prompt, model = 'gpt-3.5-turbo' } = params
		const completion = await this.openai.createChatCompletion({
			model,
			messages: prompt
		})

		const choice = completion.data.choices[0]
		if (!choice) throw new Error('No completion returned from OpenAI')
		return choice.message.content
	}


}
