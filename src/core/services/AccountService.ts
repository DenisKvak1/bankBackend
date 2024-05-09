import {IAccountService} from "./interface/types";
import {IAccountRepository} from "../repository/AccountRepository/AccountRepository";
import {IAccount} from "../models/AccountModel";
import {v4 as uuidv4} from 'uuid';
import {repositories} from "../../../env/config";

export class AccountService implements IAccountService {
    private accountRepository: IAccountRepository

    constructor(accountRepository: IAccountRepository) {
        this.accountRepository = accountRepository
    }

    async addBalance(id: number, sum: number): Promise<void> {
        const account = await this.accountRepository.getByID(id)
        this.accountRepository.update(id, {balance: +account.balance + sum})
    }

    async removeBalance(id: number, sum: number): Promise<void> {
        const account = await this.accountRepository.getByID(id)
        this.accountRepository.update(id, {balance: account.balance - sum})
    }

    async createAccount(ownerId: number): Promise<IAccount> {
        return await this.accountRepository.create({ownerId, publicId: uuidv4()})
    }

    checkExistence(id: number): boolean {
        return Boolean(this.accountRepository.getByID(id))
    }
}
export const accountService = new AccountService(repositories.accountRepository)