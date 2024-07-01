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
		const { code } = accessCodeSchema.parse(req.body);
		const accessToken = await getAccessToken(code);
		const user = await getUserData(accessToken);
		const userRepos = await getRepositories(accessToken);
		const userAlreadyExists = await getUserByGithubUrl(user.html_url);
		if (!userAlreadyExists) {
			await addUser({
				name: user.name,
				githubUrl: user.html_url,
				email: user?.email || '',
				githubRepos: userRepos,
			});
		}
		res.status(200).send({
			message: 'Access Token Fetched Successfuly',
			accessToken,
			userRepos,
			subscribedRepos: userAlreadyExists?.subscribedRepos,
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
