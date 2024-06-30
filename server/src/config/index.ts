'use strict';
require('dotenv').config();
import assert from 'assert';

const {
	PORT,
	API_KEY,
	AUTH_DOMAIN,
	DATABASE_URL,
	PROJECT_ID,
	STORAGE_BUCKET,
	MESSAGING_SENDER_ID,
	APP_ID,
	MEASUREMENT_ID,
	GITHUB_CLIENT_ID,
	GITHUB_CLIENT_SECRET,
} = process.env;

assert(PORT, 'PORT is required');
assert(API_KEY, 'Firebase API Key is required');
assert(AUTH_DOMAIN, 'Firebase AUTH_DOMAIN is required');
assert(DATABASE_URL, 'Firebase DATABASE_URL is required');
assert(PROJECT_ID, 'Firebase PROJECT_ID is required');
assert(STORAGE_BUCKET, 'Firebase STORAGE_BUCKET is required');
assert(MESSAGING_SENDER_ID, 'Firebase MESSAGING_SENDER_ID is required');
assert(APP_ID, 'Firebase APP_ID is required');
assert(MEASUREMENT_ID, 'Firebase MEASUREMENT_ID is required');
assert(GITHUB_CLIENT_ID, 'Github Client Id Is Undefined In ENV');
assert(GITHUB_CLIENT_SECRET, 'Github Client Secret Is Undefined In ENV');

export const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: AUTH_DOMAIN,
	projectId: PROJECT_ID,
	storageBucket: STORAGE_BUCKET,
	messagingSenderId: MESSAGING_SENDER_ID,
	appId: APP_ID,
	measurementId: MEASUREMENT_ID,
};

export const githubConfig = {
	githubClientId: GITHUB_CLIENT_ID,
	githubClientSecret: GITHUB_CLIENT_SECRET,
};

export default PORT;
