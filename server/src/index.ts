import express, { Express } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from '@/routes';
import 'module-alias/register';
import PORT from '@/config/index';

const corsOptions: cors.CorsOptions = {
	origin: ['http://localhost:5173'],
	credentials: true,
	optionsSuccessStatus: 200,
};

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(router);

async function main() {
	app.listen(PORT, async () => {
		console.log(`The app listening on port ${PORT}`);
	});
}
main().catch((err) => console.log(err));
