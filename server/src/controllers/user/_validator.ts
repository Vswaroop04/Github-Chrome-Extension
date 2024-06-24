// src/validators/userValidator.ts
import { z } from 'zod';

export const userSchemaValidator = z.object({
	name: z.string().min(1, 'Name is required'),
	email: z.string().email('Invalid email address'),
	githubUrl: z.string().url('Invalid URL'),
	githubRepos: z.array(z.string()),
	extensionId: z.string().min(1, 'Extension ID is required'),
});

export type User = z.infer<typeof userSchemaValidator>;
