import { IDebitRequestRepository } from '../repository/DebitRequestRepository/DebitRequestRepository';
import { IAccountService, ICardService, IDebitService, ITransferService } from './interface/types';
import { repositories } from '../../../env/config';
import { accountService } from './AccountService';
import { IDebitRequest } from '../models/DebitRequestModel';
import { transferService } from './TransferService';

export class DebitService implements IDebitService {
	private debitRequestRepository: IDebitRequestRepository;
	private accountService: IAccountService;
	private transferService: ITransferService;

	constructor(debitRequestRepository: IDebitRequestRepository, accountService: IAccountService, transferService: ITransferService) {
		this.debitRequestRepository = debitRequestRepository;
		this.accountService = accountService;
		this.transferService = transferService;
	}

	async debitRequest(cardNumber: number, cardReceiver: number, sum: number): Promise<void> {
		await this.debitRequestRepository.create({ cardNumber, cardReceiver, sum });
	}

	async debitResponse(id: number): Promise<void> {
		const debitRequest = await this.debitRequestRepository.getByID(id);
		await this.transferService.transferOnCard(debitRequest.card_destination.number, debitRequest.card_receiver.number, debitRequest.sum);
		this.debitRequestRepository.delete(id);
	}

	async getDebitRequest(id: number): Promise<IDebitRequest> {
		return await this.debitRequestRepository.getByID(id);
	}
}

export const debitService = new DebitService(repositories.debitRequestRepository, accountService, transferService);