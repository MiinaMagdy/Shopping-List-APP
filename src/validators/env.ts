import { z } from 'zod';

export const envSchema = z.object({
	PORT: z.coerce.number().int().positive(),
});

export type EnvironmentVariables = z.infer<typeof envSchema>;
