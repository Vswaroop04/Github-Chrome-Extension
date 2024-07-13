import { getRepositories } from './../../services/github';
import { Request, Response, NextFunction } from 'express';
import { accessTokenSchema } from '@/controllers/user/_validator';
import { z } from 'zod';
import { addUser, getUserByGithubUrl } from '@/services/user';
import { getUserData } from '@/services/github';

export const getUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const accessToken = req.get('Authorization');
		if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });
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
