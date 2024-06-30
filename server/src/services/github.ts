import { githubConfig } from '@/config';

export const getAccessToken = async (code: string): Promise<string | null> => {
	try {
		const params =
			'?client_id=' +
			githubConfig.githubClientId +
			'&client_secret=' +
			githubConfig.githubClientSecret +
			'&code=' +
			code;
		const response = await fetch(
			'https://github.com/login/oauth/access_token' + params,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			},
		);

		const data = await response.json();
		return data.access_token;
	} catch (error) {
		console.error('Error fetching access token:', error);
		return null;
	}
};

export const getUserData = async (accessToken: string) => {
	try {
		const response = await fetch('https://api.github.com/user', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
		const data = await response.json();
		return data;
	} catch (error) {
		console.error('Error fetching access token:', error);
		return null;
	}
};

export const getRepositories = async (
	accessToken: string,
): Promise<string[] | null> => {
	try {
		const fetchWithHeaders = async (url: string) => {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					Accept: 'application/vnd.github.v3+json',
				},
			});
			return response.json();
		};

		// Fetch user repositories
		const userReposUrl = new URL('https://api.github.com/user/repos');
		userReposUrl.search = new URLSearchParams({
			type: 'owner',
			per_page: '100',
		}).toString();
		const personalRepos = await fetchWithHeaders(userReposUrl.toString());
		let repoUrls = personalRepos.map((repo: any) => repo.html_url);

		const orgsUrl = 'https://api.github.com/user/orgs';
		const organizations = await fetchWithHeaders(orgsUrl);
		for (const org of organizations) {
			const orgReposUrl = `https://api.github.com/orgs/${org.login}/repos`;
			const orgRepos = await fetchWithHeaders(orgReposUrl);
			for (const repo of orgRepos) {
				if (repo.permissions.admin) {
					repoUrls.push(repo.html_url);
				}
			}
		}
		return repoUrls;
	} catch (error) {
		console.error('Error fetching repositories:', error);
		return null;
	}
};

export const addWebhook = async (
	accessToken: string,
	owner: string,
	repo: string,
	webhookUrl: string,
) => {
	try {
		const response = await fetch(
			`https://api.github.com/repos/${owner}/${repo}/hooks`,
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${accessToken}`,
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
				body: JSON.stringify({
					name: 'web',
					active: true,
					events: ['push', 'pull_request'],
					config: {
						url: webhookUrl,
						content_type: 'json',
					},
				}),
			},
		);

		return response.ok;
	} catch (error) {
		console.error('Error adding webhook:', error);
		return false;
	}
};
