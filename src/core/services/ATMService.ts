import { IAccountService, IATMService, ICardService, IUserService } from './interface/types';
import { IATM } from '../models/ATMModel';
import { IATMRepository } from '../repository/IATMRepository/ATMRepository';
import { accountService, AccountService } from './AccountService';
import { userService, UserService } from './UserService';
import { v4 as uuidv4 } from 'uuid';
import { repositories } from '../../../env/config';
import { cardService } from './CardService';
import * as repl from 'repl';

export class ATMService implements IATMService {
	private ATMRepository: IATMRepository;
	private accountService: IAccountService;
	private userService: IUserService;
	private cardService: ICardService;

	constructor(ATMRepository: IATMRepository, cardService: ICardService, accountService: AccountService, userService: UserService) {
		this.ATMRepository = ATMRepository;
		this.cardService = cardService;
		this.accountService = accountService;
		this.userService = userService;
	}

	async createATM(): Promise<IATM> {
		const user = await this.userService.register({ email: `${uuidv4()}@company.com`, name: 'ATM', password: uuidv4() });
		const account = await this.accountService.createAccount(user.id);
		const ATM = this.ATMRepository.create({ account_id: account.id });
		return ATM;
	}

	async getATMByID(id: number): Promise<IATM | undefined> {
		return await this.ATMRepository.getByID(id);
	}

	async replenishmentAccount(id: number, replenishmentID: number, sum: number): Promise<void> {
		const atm = await this.ATMRepository.getByID(id);
		this.accountService.removeBalance(atm.account.id, sum);
		this.accountService.addBalance(replenishmentID, sum);
	}

	async replenishmentCard(id: number, cardNumber: number, sum: number): Promise<void> {
		const atm = await this.ATMRepository.getByID(id);
		const replenishmentCard = await this.cardService.getByNumber(cardNumber);

		this.accountService.removeBalance(atm.account.id, sum);
		this.accountService.addBalance(replenishmentCard.account.id, sum);
	}
}

export const ATMservice = new ATMService(repositories.ATMRepository, cardService, accountService, userService);