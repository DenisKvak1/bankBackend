import * as express from 'express';
import { IATMService, ICardService } from '../../core/services/interface/types';
import { appConfig, userAuthService } from '../../../env/config';
import { ATMservice, ATMService } from '../../core/services/ATMService';
import { cardService } from '../../core/services/CardService';

export class HttpATMController {
	private ATMService: IATMService;
	private cardService: ICardService;

	constructor(ATMService: IATMService, cardService: ICardService) {
		this.ATMService = ATMService;
		this.cardService = cardService;
	}

	async createATM(req: express.Request, res: express.Response) {
		try {
			const atmKey = req.headers['atm_key'];

			if (atmKey !== appConfig.ATMKey) return res.json({ status: 'error', errorText: 'Ключ ATM не верный' });
			const atm = await this.ATMService.createATM()

			res.json({status: 'ok', atm})
		} catch (e) {
			res.json({status: 'error'})
		}
	}

	async replenishment(req: express.Request, res: express.Response) {
		try {
			const authorizationData = userAuthService.getData(req.headers['authorization']);
			const { atmID, cardNumber, sum } = req.body.replenishment;

			const atm = await this.ATMService.getATMByID(atmID);

			if (atm?.account.owner.id !== authorizationData.id) return res.json({
				status: 'error',
				errorText: 'Не авторизован',
			});
			if (!await this.cardService.checkExistence(cardNumber)) return res.json({
				status: 'error',
				errorText: 'Карты не существует',
			});

			this.ATMService.replenishmentCard(atmID, cardNumber, sum);
			res.json({ status: 'ok' });
		} catch (e) {
			res.json({ status: 'error', errorText: e.message});
		}
	}
}

export const httpATMController = new HttpATMController(ATMservice, cardService);