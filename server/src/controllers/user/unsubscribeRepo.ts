import { Request, Response, NextFunction } from 'express';
import { idSchema, userSchemaValidator } from '@/controllers/user/_validator';
import { z } from 'zod';
import { updateUser } from '@/services/user';

export const unsubscribeUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const { id } = idSchema.parse(req.params);
		const userUpdates = userSchemaValidator.partial().parse(req.body);

		await updateUser(id, userUpdates);
		res.status(200).send({ message: 'User unsubscribed successfully' });
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
