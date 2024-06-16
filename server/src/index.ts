require('dotenv').config();
import { GithubStrategy } from 'passport-github2';
import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '@/routes';
import 'module-alias/register';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { firebaseConfig } from './utils/fireBase';

const corsOptions: cors.CorsOptions = {
	origin: ['http://localhost:5173'],
	credentials: true,
	optionsSuccessStatus: 200,
};

// passport.use(
// 	new GithubStrategy(
// 		{
// 			clientID: process.env.GITHUB_CLIENT_ID,
// 			clientSecret: process.env.GITHUB_CLIENT_SECRET,
// 			callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
// 		},
// 		function (accessToken, refreshToken, profile, done) {
// 			console.log(accessToken, refreshToken, profile, done);
// 		},
// 	),
// );
const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(router);

async function main() {
	const port = process.env.PORT;
	app.listen(port, async () => {
		console.log(`The app listening on port ${port}`);
	});
	const firebaseApp = initializeApp(firebaseConfig);
}
main().catch((err) => console.log(err));
