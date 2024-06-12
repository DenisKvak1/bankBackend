import { IDebitRequestRepository } from '../repository/DebitRequestRepository/DebitRequestRepository';
import { IDebitService, ITransferService } from './interface/types';
import { repositories } from '../../../env/config';
import { IDebitRequest } from '../models/DebitRequestModel';
import { transferService } from './TransferService';

export class DebitService implements IDebitService {
	private debitRequestRepository: IDebitRequestRepository;
	private transferService: ITransferService;

	constructor(debitRequestRepository: IDebitRequestRepository, transferService: ITransferService) {
		this.debitRequestRepository = debitRequestRepository;
		this.transferService = transferService;
	}

	async debitRequest(cardNumber: number, cardReceiver: number, sum: number): Promise<IDebitRequest> {
		return await this.debitRequestRepository.create({ cardNumber, cardReceiver, sum });
	}

	async debitResponse(id: number, accept: boolean): Promise<void> {
		const debitRequest = await this.debitRequestRepository.getByID(id);
		this.debitRequestRepository.update(id, {finished: true, success: accept})
		if(!accept) return 
		await this.transferService.transferOnCard(debitRequest.card_destination.number, debitRequest.card_receiver.number, debitRequest.sum);
	}

	async getDebitRequest(id: number): Promise<IDebitRequest | undefined> {
		return await this.debitRequestRepository.getByID(id);
	}
}
export const debitService = new DebitService(repositories.debitRequestRepository, transferService);