import { ICardRepository } from '../../../core/repository/CardRepository/CardRepository';
import { SQLDataBase } from '../interfaces/sql';
import { CreateCardDTO, UpdateCardDTO } from '../../../core/repository/CardRepository/dto/cardDTO';
import { ICard } from '../../../core/models/CardModel';
import { getRandomInt } from '../../../../env/helpers/randomNumber';
import { generateCreditCardNumber } from '../../../../env/helpers/generateCreditCart';
import {
    createCardSQL,
    deleteByNumberCardSQL,
    deleteCardSQL,
    getAllCardsSQL,
    getByIDCardSQL, getByNumberCardSQL, updateAccount_idCardSQl, updateCVV2CardSQL,
} from '../SQLQuery/Card.sql';

export class SQLCardRepository implements ICardRepository {
    private sqlDB: SQLDataBase

    constructor(sqlDB: SQLDataBase) {
        this.sqlDB = sqlDB
    }

    async create(dto: CreateCardDTO): Promise<ICard> {
        const result = await this.sqlDB.query(createCardSQL, [dto.account_id, generateCreditCardNumber(), getRandomInt(100, 999), dto.date_expired])
        return result.rows[0]
    }

    delete(id: number): void {
        this.sqlDB.query(deleteCardSQL, [id])
    }

    deleteByNumber(number: number): void {
        this.sqlDB.query(deleteByNumberCardSQL, [number])
    }

    async getAll(): Promise<ICard[]> {
        const result = await this.sqlDB.query(getAllCardsSQL);
        return result.rows;
    }

    async getByID(id: number): Promise<ICard | undefined> {
        const result = await this.sqlDB.query(getByIDCardSQL, [id]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }


    async getByNumber(number: number): Promise<ICard | undefined> {
        const result = await this.sqlDB.query(getByNumberCardSQL, [number]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }

    async update(id: number, dto: UpdateCardDTO): Promise<void> {
        const updateObject = {
            account_id: () => updateAccount_idCardSQl,
            cvv2: () => updateCVV2CardSQL
        }
        for (const dtoKey in dto) {
            await this.sqlDB.query(updateObject[dtoKey](dto[dtoKey]),[id, dto[dtoKey]])
        }
    }
}