import { IDebitRequestRepository } from '../../../core/repository/DebitRequestRepository/DebitRequestRepository';
import { CreateDebitRequestDTO, UpdateDebitRequestDTO } from '../../../core/repository/DebitRequestRepository/dto/debitRequestDTO';
import { IDebitRequest } from '../../../core/models/DebitRequestModel';
import { SQLDataBase } from '../interfaces/sql';
import {
    createDebitRequestSQL,
    deleteDebitRequestSQL,
    getAllDebitRequestsSQL,
    getByIDDebitRequestSQL, updateDebitRequestFinished, updateDebitRequestSuccess,
} from '../SQLQuery/DebitRequest.sql';

export class SQLDebitRequestRepository implements IDebitRequestRepository {
    private sqlDB: SQLDataBase;

    constructor(sqlDB: SQLDataBase) {
        this.sqlDB = sqlDB;
    }

    async update(id: number, dto: UpdateDebitRequestDTO): Promise<void> {
        const updateObject = {
            finished: () => updateDebitRequestFinished,
            success: () => updateDebitRequestSuccess
        }
        for (const dtoKey in dto) {
            await this.sqlDB.query(updateObject[dtoKey](dto[dtoKey]),[id, dto[dtoKey]])
        }
    }

    async create(dto: CreateDebitRequestDTO): Promise<IDebitRequest> {
        const result = await this.sqlDB.query(createDebitRequestSQL, [dto.cardNumber, dto.cardReceiver, dto.sum])
        return result.rows[0]
    }

    async delete(id: number): Promise<void> {
        await this.sqlDB.query(deleteDebitRequestSQL, [id]);
    }

    async getAll(): Promise<IDebitRequest[]> {
        const result = await this.sqlDB.query(getAllDebitRequestsSQL);
        return result.rows;
    }

    async getByID(id: number): Promise<IDebitRequest | undefined> {
		const result = await this.sqlDB.query(getByIDDebitRequestSQL, [id]);
        
        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }
}

