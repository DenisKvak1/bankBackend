import { ICardService, IDebitService } from '../../core/services/interface/types';
import { authorizationData } from '../services/AuthorizationService/interfaces/types';
import { IWebSocketClientsController } from '../UserExpress/module/interfaces/types';
import { wsClientMessage, wsServerCommands, wsServerMessage } from '../UserExpress/webSocket/types';
import { cardService } from '../../core/services/CardService';
import { debitService } from '../../core/services/DebitService';

export class WebSocketCardController {
	private cardService: ICardService;
	private debitService: IDebitService;

	constructor(cardService: ICardService, debitService: IDebitService) {
		this.cardService = cardService;
		this.debitService = debitService;
	}

	async debitRequest(wsMessage: any, wsClients: IWebSocketClientsController<wsServerMessage>, authorizationData: authorizationData) {
		try {
			const { destinationNumber, ccv2, date, receiverNumber, sum } = wsMessage.debitData;

			if (destinationNumber === receiverNumber) {
				return wsClients.dispatchByID(authorizationData.id, {
					status: 'error',
					errorText: 'Карта для списание и карта получателя совпадают',
				});
			}
			if (!await this.cardService.checkCorrectCardData(destinationNumber, ccv2, date)) {
				return wsClients.dispatchByID(authorizationData.id, {
					status: 'error',
					errorText: 'Данные не корректны',
				});
			}
			const card = await this.cardService.getByNumber(destinationNumber);
			const cardOwner = card.account.owner;

			this.debitService.debitRequest(destinationNumber, receiverNumber, sum);
			wsClients.dispatchByID(cardOwner.id, {
				status: 'ok',
				command: wsServerCommands.DEBIT_REQUEST,
				payload: {
					debitData: {
						destinationNumber,
						receiverNumber,
						sum,
					},
				},
			});
			wsClients.dispatchByID(authorizationData.id, { status: 'ok', command: wsServerCommands.DEBIT_REQUEST });
		} catch (e) {
			wsClients.dispatchByID(authorizationData.id, { status: 'error', errorText: e.message });
		}
	}

	async debitResponse(wsMessage: any, wsClients: IWebSocketClientsController<wsServerMessage>, authorizationData: authorizationData) {
		try {
			const { debitID, accept } = wsMessage.debitData;

			if (!accept) return wsClients.dispatchByID(authorizationData.id, { status: 'ok' });
			const debitRequest = await this.debitService.getDebitRequest(debitID);

			if (!debitRequest?.card_destination.number) {
				return wsClients.dispatchByID(authorizationData.id, {
					status: 'error',
					errorText: 'Не верный id',
				});

			}
			if (!await this.cardService.checkOwner(authorizationData.id, debitRequest.card_destination.number)) {
				return wsClients.dispatchByID(authorizationData.id, {
					status: 'error',
					errorText: 'Попытка списать деньги с чужой карты',
				});
			}

			this.debitService.debitResponse(debitID);

			wsClients.dispatchByID(debitRequest.card_receiver.account.owner.id, {
				status: 'ok',
				command: wsServerCommands.DEBIT_RESPONSE,
				payload: {
					debitData: {
						destinationNumber: debitRequest.card_destination.number,
						receiverNumber: debitRequest.card_receiver.number,
						sum: debitRequest.sum,
					},
				},
			});
			wsClients.dispatchByID(authorizationData.id, { status: 'ok', command: wsServerCommands.DEBIT_RESPONSE });
		} catch (e) {
			wsClients.dispatchByID(authorizationData.id, { status: 'error', errorText: e.message });
		}
	}
}

export const webSocketCardController = new WebSocketCardController(cardService, debitService);