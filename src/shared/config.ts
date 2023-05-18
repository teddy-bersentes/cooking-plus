import { z } from 'zod'

const configSchema = z.object({
	DB_URL: z.string(),
	NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
	PORT: z.number().default(3000),
	AUTH0_ISSUER_URL: z.string(),
	AUTH0_AUDIENCE: z.string(),
	OPENAI_API_KEY: z.string(),
})

export const validateConfig = (config: Record<string, unknown>) => configSchema.parse(config)

export type Config = z.infer<typeof configSchema>