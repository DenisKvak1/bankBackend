import {IAccountRepository} from "../../../core/repository/AccountRepository/AccountRepository";
import {CreateAccountDTO, UpdateAccountDTO} from "../../../core/repository/AccountRepository/dto/AccountDTO";
import {IAccount} from "../../../core/models/AccountModel";
import {SQLDataBase} from "../interfaces/sql";
import {
    createAccountSQL,
    deleteAccountSQL,
    deleteByPublic_idAccountSQL,
    getAllAccountsSQL, getByIDAccountSQL, getByPublic_idAccountSQL, updateBalanceAccountSQL,
} from '../SQLQuery/Account.sql';

export class SQLAccountRepository implements IAccountRepository {
    private sqlDB: SQLDataBase

    constructor(sqlDB: SQLDataBase) {
        this.sqlDB = sqlDB
    }

    async create(dto: CreateAccountDTO): Promise<IAccount> {
        const result = await this.sqlDB.query(createAccountSQL, [dto.ownerId, dto.publicId]);
        return result.rows[0];
    }

    delete(id: number): void {
        this.sqlDB.query(deleteAccountSQL, [id])
    }

    deleteByPublicID(publicID: number): void {
        this.sqlDB.query(deleteByPublic_idAccountSQL, [publicID])
    }

    async getAll(): Promise<IAccount[]> {
        const result = await this.sqlDB.query(getAllAccountsSQL);
        return result.rows;
    }

    async getByID(id: number): Promise<IAccount | undefined> {
        const result =  await this.sqlDB.query(getByIDAccountSQL, [id]);
        if (result.rows.length === 0) return

        return result.rows[0];
    }

    async getByPublicID(id: string): Promise<IAccount | undefined> {
        const result = await this.sqlDB.query(getByPublic_idAccountSQL, [id]);
        if (result.rows.length === 0) return

        return result.rows[0];
    }

    update(id: number, dto: UpdateAccountDTO): void {
        const updateObject = {
            balance: () => updateBalanceAccountSQL,
        }
        for (const dtoKey in dto) {
            this.sqlDB.query(updateObject[dtoKey](), [id, dto[dtoKey]])
        }
    }
}

