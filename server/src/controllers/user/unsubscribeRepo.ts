import { Request, Response, NextFunction } from 'express';
import {
	idSchema,
	repoLinkValidator,
	userSchemaValidator,
} from '@/controllers/user/_validator';
import { z } from 'zod';
import { updateUnSubscribeRepoSubscription, updateUser } from '@/services/user';
import { removeWebHook } from '@/services/github';

export const unsubscribeRepo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const accessToken = req.get('Authorization');
		if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });
		const { repoLink } = repoLinkValidator.parse(req.body);
		const parts = repoLink.split('/');
		const baseGithubUrl = parts.slice(0, 4).join('/');
		const owner = parts[3].toLowerCase();
		const repoName = parts[4].toLowerCase();
		const removeWebHok = await removeWebHook(accessToken, owner, repoName);
		if (removeWebHok) {
			await updateUnSubscribeRepoSubscription(baseGithubUrl, repoLink);
			res.status(200).send({ message: 'Repo unsubscribed successfully' });
		} else {
			res.status(400).send({ message: 'Repo unsubscribed Failed' });
		}
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
