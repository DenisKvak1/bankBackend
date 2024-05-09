import {IATMRepository} from "../../../core/repository/IATMRepository/ATMRepository";
import {SQLDataBase} from "../interfaces/sql";
import {CreateATMDTO, UpdateATMDTO} from "../../../core/repository/IATMRepository/dto/ATMDTO";
import {IATM} from "../../../core/models/ATMModel";
import { createATMSQL, deleteATMSQL, getAllATMSQL, getByIDATMSQL, updateAccount_idATMSQL } from '../SQLQuery/ATM.sql';

export class SQLATMRepository implements IATMRepository {
    private sqlDB: SQLDataBase

    constructor(sqlDB: SQLDataBase) {
        this.sqlDB = sqlDB
    }

    async create(dto: CreateATMDTO): Promise<IATM> {
        const result = await this.sqlDB.query(createATMSQL, [dto.account_id]);
        return result.rows[0];
    }

    delete(id: number): void {
        this.sqlDB.query(deleteATMSQL, [id])
    }

    async getAll(): Promise<IATM[]> {
        const result = await this.sqlDB.query(getAllATMSQL);
        return result.rows;
    }

    async getByID(id: number): Promise<IATM | undefined> {
        const result = await this.sqlDB.query(getByIDATMSQL, [id]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }

    async update(id: number, dto: UpdateATMDTO): Promise<void> {
        const updateObject = {
            account_id: () => updateAccount_idATMSQL
        }
        for (const dtoKey in dto) {
            await this.sqlDB.query(updateObject[dtoKey](), [id, dto[dtoKey]])
        }
    }
}