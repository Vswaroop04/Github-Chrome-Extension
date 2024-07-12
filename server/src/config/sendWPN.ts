import admin from 'firebase-admin';

var serviceAccount = require('../utils/github-chrome-extension-firebase-adminsdk.json');

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
});

export async function sendPushNotification(
	deviceToken: string,
	title: string,
	body: string,
	data: { url: string },
) {
		try {
			const message: admin.messaging.Message = {
				notification: {
					title: title,
					body: body,
				},
				token: deviceToken,
				data,
			};

			admin
				.messaging()
				.send(message)
				.then((response: any) => {
					console.log('response send to', response);
				})
				.catch((error: any) => {
					console.log('error from index push', error);
				});
		} catch (error) {
			console.error('error from index push catch', error);
			throw error;
		}
}
