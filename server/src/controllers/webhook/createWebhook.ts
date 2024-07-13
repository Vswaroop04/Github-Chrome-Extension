import { getMessaging } from 'firebase/messaging';
import { getUserByGithubUrl } from '@/services/user';
import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { sendPushNotification } from '@/config/sendWPN';

let pendingNotifications: Array<{
	prNumber: number;
	owner: string;
	repo: string;
	attempts: number;
}> = [];

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

			if (eventType === 'pull_request') {
				pendingNotifications.push({
					prNumber: req.body.number,
					owner: req.body.repository.owner.login,
					repo: repoName,
					attempts: 0,
				});
			}

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

			res.status(200).json({ message: 'Push Notification sent successfully' });
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

const notificationScheduler = setInterval(async () => {
	pendingNotifications = pendingNotifications.filter(async (notification) => {
		if (notification.attempts < 4) {
			try {
				const user = await getUserByGithubUrl(notification.owner);
				await sendPushNotification(
					user.gcmToken,
					`Reminder: See If Pull Request ${notification.prNumber} is still pending in ${notification.repo}`,
					`This pull request is waiting for your review. Click here to view: https://github.com/${notification.owner}/${notification.repo}/pull/${notification.prNumber}`,
					{
						url: `https://github.com/${notification.owner}/${notification.repo}/pull/${notification.prNumber}`,
					},
				);
				notification.attempts++;
				return true; 
			} catch (error) {
				console.error(
					`Failed to send notification for PR ${notification.prNumber}:`,
					error,
				);
				return true; 
			}
		} else {
			return false; 
		}
	});

	if (pendingNotifications.length === 0) {
		clearInterval(notificationScheduler);
	}
}, 3600000);
