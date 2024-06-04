import express from 'express';
import bodyParser from 'body-parser';
import { authenticationMiddleware } from './middleware/authenticationMiddleware';
import { userAuthService } from '../../../env/config';
import { userRouter } from './routes/UserRouter';
import { cardRouter } from './routes/CardRoutes';
import { ATMRoute } from './routes/ATMRouter';

export class ExpressApp {
	private app: express.Express;

	constructor() {
		this.initApp();
	}

	private initApp() {
		this.app = express();
		this.setupMiddleware();
		this.setupRoutes();
	}

	private setupMiddleware() {
		this.app.use(bodyParser.json());
		this.app.use((req, res, next) => authenticationMiddleware(req, res, next, userAuthService));
	}

	private setupRoutes() {
		this.app.use('/user', userRouter);
		this.app.use('/card', cardRouter);
		this.app.use('/atm', ATMRoute);
	}

	start(port: number) {
		this.app.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}
export const expressApp = new ExpressApp()