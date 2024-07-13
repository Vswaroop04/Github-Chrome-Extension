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
		console.log('webhook req from github');
		console.log(req.body);
		if (!req.body.repository) {
			return res.status(400).json({ message: 'Invalid request' });
		}
		const eventType = req.headers['x-github-event'];
		if (eventType == 'push' || eventType === 'pull_request') {
			const parts = req.body.repository.html_url.split('/');
			const baseGithubUrl = parts.slice(0, 4).join('/');
			const user = await getUserByGithubUrl(baseGithubUrl);
			const repoName = extractRepoNameFromUrl(req.body.repository.html_url);

			await sendPushNotification(
				user.gcmToken,
				req.body.action == 'opened'
					? `${req.body.sender.login} created a new pull request in ${repoName}`
					: `${req.body.pusher.name} added new commit in ${repoName}`,
				req.body.action == 'opened'
					? `Please take a look: A new pull request has been created in the repository ${repoName}. Click here to view: ${req.body.repository.html_url}`
					: `New changes have been pushed to the repository ${repoName}. Click here to review: ${req.body.repository.html_url}`,

				{ url: req.body.repository.html_url },
			);
			res.status(200).json({ message: 'Push Notification sent succesfully' });
		} else {
			res.status(400).json({ message: 'Invalid request' });
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
