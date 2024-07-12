import { getMessaging } from 'firebase/messaging';
import { getUserByGithubUrl } from '@/services/user';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendPushNotification } from '@/config/sendWPN';

function extractRepoNameFromUrl(url: string): string {
	const repoName = url.split('/').pop();
	return repoName || '';
}

export const createWebHook = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		console.log(req.body);
		if (!req.body.repository) {
			return res.status(400).json({ message: 'Invalid request' });
		}
		const user = await getUserByGithubUrl(req.body.repository.html_url);
		const repoName = extractRepoNameFromUrl(req.body.repository.html_url);

		await sendPushNotification(
			user.gcmToken,
			req.body.action == 'opened'
				? 'New Pull Request Created'
				: 'New Push Event',
			req.body.action == 'opened'
				? `A new pull request has been created in the repository ${repoName}. Check it out here: ${req.body.repository.html_url}`
				: `New changes have been pushed to the repository ${repoName}. Review them here: ${req.body.repository.html_url}`,
			{ url: req.body.repository.html_url },
		);
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
