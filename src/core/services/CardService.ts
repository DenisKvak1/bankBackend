import { ICardService } from './interface/types';
import { ICard } from '../models/CardModel';
import { ICardRepository } from '../repository/CardRepository/CardRepository';
import { repositories } from '../../../env/config';


export class CardService implements ICardService {
	private cardRepository: ICardRepository;

	constructor(cardRepository: ICardRepository) {
		this.cardRepository = cardRepository;
	}

	async createCard(accountID: number, dateExpired: string): Promise<ICard> {
		return await this.cardRepository.create({ account_id: accountID, date_expired: dateExpired});
	}

	deleteCard(number: number): void {
		this.cardRepository.deleteByNumber(number);
	}

	async getByNumber(number: number): Promise<ICard> {
		return await this.cardRepository.getByNumber(number);
	}

	async checkExistence(number: number): Promise<boolean> {
		return Boolean(await this.cardRepository.getByNumber(number));
	}

	async checkOwner(id: number, number: number): Promise<boolean> {
		const card = await this.cardRepository.getByNumber(number);
		return id === card.account.owner.id;
	}

	async checkExpire(number: number): Promise<boolean> {
		const card = await this.cardRepository.getByNumber(number);
		return Date.parse(card.dateExpired) < Date.now()
	}

	async checkCorrectCardData(number: number, cvv2: number): Promise<boolean> {
		const card = await this.cardRepository.getByNumber(number);

		if (!card) return false;
		if (card.cvv2 !== cvv2) return false;
		if (Date.parse(card.dateExpired) < Date.now()) return false;

		return true;
	}
}

export const cardService = new CardService(repositories.cardRepository);