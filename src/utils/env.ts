import dotenv from 'dotenv';
// config will read your ".env" file, parse the contents, assign it to process.env.
dotenv.config();
import { EnvironmentVariables, envSchema } from '../validators/env';

// Singleton Pattern
class Environment {
	private static instance: Environment;
	private readonly env: EnvironmentVariables;

	private constructor() {
		try {
			// Parse the environment variables using the schema
			this.env = envSchema.parse(process.env);
		} catch (e: unknown) {
			// If the environment variables are invalid, throw an error
			throw new Error(
				`Environment variable validation failed: ${
					(e as Error).message ?? 'Unknown error'
				}`,
			);
		}
	}

	static getInstance(): Environment {
		// If an instance already exists, return it, otherwise create a new instance
		if (!Environment.instance) {
			Environment.instance = new Environment();
		}

		return Environment.instance;
	}

	public getEnvValue<T extends keyof EnvironmentVariables>(
		key: T,
		defaultValue?: EnvironmentVariables[T],
	): EnvironmentVariables[T] {
		// Return the value of the environment variable or the default value if it does not exist
		return this.env[key] ?? defaultValue;
	}
}

// Export the singleton instance
export default Environment.getInstance();
