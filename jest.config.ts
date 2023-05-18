import type { Config } from 'jest'
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config = {
	moduleFileExtensions: ['js', 'json', 'ts'],
	rootDir: './',
	testEnvironment: 'node',
	testRegex: '.e2e-spec.ts$',
	transform: {
		'^.+\\.(t|j)s$': 'ts-jest',
	},
	moduleNameMapper: pathsToModuleNameMapper({ "~/*": ["src/*"] }, { prefix: '<rootDir>/' }),
}

export default config