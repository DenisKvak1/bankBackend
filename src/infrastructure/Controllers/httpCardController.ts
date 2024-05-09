import { cardService } from '../../core/services/CardService';
import { accountService } from '../../core/services/AccountService';
import * as express from 'express';
import { userAuthService } from '../../../env/config';
import { transferService } from '../../core/services/TransferService';
import { IAccountService, ICardService, IDebitService, ITransferService } from '../../core/services/interface/types';
import { debitService } from '../../core/services/DebitService';

export class HttpCardController {
	private cardService: ICardService;
	private accountService: IAccountService;
	private transferService: ITransferService;
	private debitService: IDebitService;

	constructor(cardService: ICardService, accountService: IAccountService, transferService: ITransferService, debitService: IDebitService) {
		this.cardService = cardService;
		this.accountService = accountService;
		this.transferService = transferService;
		this.debitService = debitService;
	}

	async createCard(req: express.Request, res: express.Response) {
		try {
			const authorizationData = userAuthService.getData(req.headers['authorization']);
			const account = await this.accountService.createAccount(authorizationData.id);
			const dateExpired = new Date(new Date().setFullYear(new Date().getFullYear() + 5)).toISOString();
			const card = await this.cardService.createCard(account.id, dateExpired);

			res.json({ status: 'ok', card: card });
		} catch (e){
			res.json({status: 'error'})
		}
	}

	async transfer(req: express.Request, res: express.Response) {
		try {
			const authorizationData = userAuthService.getData(req.headers['authorization']);
			const { destinationNumber, receiverNumber, sum } = req.body.transferData;
			const destinationCard = await this.cardService.getByNumber(destinationNumber);

			if (destinationNumber === receiverNumber) return res.json({
				status: 'error',
				errorText: 'Карты отправителя и получателя совпадают',
			});
			if (!await this.cardService.checkOwner(authorizationData.id, destinationNumber)) return res.json({
				status: 'error',
				errorText: 'Попытка перевести деньги с чужой карты',
			});
			if (destinationCard.account.balance < sum) return res.json({
				status: 'error',
				errorText: 'Недостаточный баланс карты',
			});
			if (await this.cardService.checkExpire(destinationNumber)) return res.json({
				status: 'error',
				errorText: 'Карта просроченна',
			});

			await this.transferService.transferOnCard(destinationNumber, receiverNumber, sum);
			res.json({ status: 'ok' });
		} catch (e){
			res.json({ status: 'error' });
		}
	}

	async debitRequest(req: express.Request, res: express.Response) {
		try {
			const { destinationNumber, ccv2, date, receiverNumber, sum } = req.body.debitData;

			if (destinationNumber === receiverNumber) return res.json({
				status: 'error',
				errorText: 'Карта для списание и карта получателя совпадают',
			});
			if (!await this.cardService.checkCorrectCardData(destinationNumber, ccv2, date)) return res.json({
				status: 'error',
				errorText: 'Данные не корректны',
			});
			const card = await this.cardService.getByNumber(destinationNumber)
			const cardOwner = card.account.owner

			this.debitService.debitRequest(destinationNumber, receiverNumber, sum);

			res.json({ status: 'ok' });
		} catch (e) {
			res.json({ status: 'error', errorText: e.message});
		}
	}

	async debitResponse(req: express.Request, res: express.Response) {
		try {
			const authorizationData = userAuthService.getData(req.headers['authorization']);
			const { debitID, accept } = req.body.debitData;

			if (!accept) return res.json({ status: 'ok' });
			const debitRequest = await this.debitService.getDebitRequest(debitID);

			if (!debitRequest?.card_destination.number) return res.json({ status: 'error', errorText: 'Не верный id' });
			if (!await this.cardService.checkOwner(authorizationData.id, debitRequest.card_destination.number)) return res.json({
				status: 'error',
				errorText: 'Попытка списать деньги с чужой карты',
			});
			this.debitService.debitResponse(debitID);

			res.json({ status: 'ok' });
		} catch (e) {
			res.json({ status: 'error' });
		}
	}
}

export const httpCreditController = new HttpCardController(cardService, accountService, transferService, debitService);