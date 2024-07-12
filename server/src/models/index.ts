export interface User {
	id?: string;
	name: string;
	email?: string;
	githubUrl: string;
	githubRepos?: string[];
	subscribedRepos?: string[];
	gcmToken?: string;
}
