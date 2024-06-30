import { getRepositories } from './../../services/github';
import { Request, Response, NextFunction } from 'express';
import {
	accessCodeSchema,
	userSchemaValidator,
} from '@/controllers/user/_validator';
import { z } from 'zod';
import { addUser, getUserByGithubUrl } from '@/services/user';
import { getAccessToken, getUserData } from '@/services/github';

export const registerUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		
		res.status(200).send({
			message: 'Access Token Fetched Successfuly',
	
		});
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
