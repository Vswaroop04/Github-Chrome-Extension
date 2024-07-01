import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const createWebHook = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		
	} catch (error) {
		if (error instanceof z.ZodError) {
			res
				.status(400)
				.send({ message: 'Validation failed', errors: error.errors });
		} else {
			next(error);
		}
	}
};
