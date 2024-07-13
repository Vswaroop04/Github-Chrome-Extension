import {
	addWebhookForOrganizationRepo,
	addWebhookForPersonalRepo,
	getUserData,
} from '@/services/github';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { repoLinkValidator } from './_validator';
import { REPO_WEBHOOK_URL } from '@/config';
import { getUserByGithubUrl, updateRepoSubscription } from '@/services/user';

export const subscribeRepo = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const accessToken = req.get('Authorization');
		if (!accessToken) return res.status(401).json({ message: 'Unauthorized' });
		if (!req.body.token) {
			return res.status(400).json({ message: 'Missing token' });
		}
		const { repoLink } = repoLinkValidator.parse(req.body);
		const parts = repoLink.split('/');
		const owner = parts[3].toLowerCase();
		const baseGithubUrl = parts.slice(0, 4).join('/');
		const user = await getUserData(accessToken);
		const repoName = parts[4].toLowerCase();
		let webHook = await addWebhookForPersonalRepo(
			accessToken,
			owner,
			repoName,
			REPO_WEBHOOK_URL,
		);

		if (!webHook) throw Error('Issue In Creating Webhook');
		if (webHook.active) {
			await updateRepoSubscription(user.html_url, repoLink, req.body.token);
		}
		res.status(webHook.status ? parseInt(webHook.status) : 200).send({
			message:
				webHook.errors?.length > 0
					? webHook.errors[0].message
					: 'Webhook Created',
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
