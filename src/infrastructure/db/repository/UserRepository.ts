import { IUserRepository } from '../../../core/repository/UserRepository/UserRepository';
import { CreateUserDTO, UpdateUserDTO } from '../../../core/repository/UserRepository/dto/UserDTO';
import { IUser } from '../../../core/models/UserModel';
import { SQLDataBase } from '../interfaces/sql';
import {
    createUserSQL,
    deleteUserSQL,
    getAllUsersSQL,
    getByEmailUserSQL,
    getByIDUserSQL,
    updateEmailUserSQL, updateNameUserSQL, updatePasswordUserSQL,
} from '../SQLQuery/User.sql';

export class SQLUserRepository implements IUserRepository {
    private sqlDB: SQLDataBase

    constructor(sqlDB: SQLDataBase) {
        this.sqlDB = sqlDB
    }

    async create(dto: CreateUserDTO): Promise<IUser> {
        const result = await this.sqlDB.query(createUserSQL, [dto.email, dto.password, dto.name]);
        return result.rows[0];
    }

    async delete(id: number): Promise<void> {
        await this.sqlDB.query(deleteUserSQL, [id])
    }

    async getAll(): Promise<IUser[]> {
        const result = await this.sqlDB.query(getAllUsersSQL);
        return result.rows;
    }

    async getByEmail(email: string): Promise<IUser | undefined> {
        const result = await this.sqlDB.query(getByEmailUserSQL, [email]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }

    async getByID(id: number): Promise<IUser | undefined> {
        const result = await this.sqlDB.query(getByIDUserSQL, [id]);

        if (result.rows.length === 0) {
            return undefined;
        }

        return result.rows[0];
    }

    async update(id: number, dto: UpdateUserDTO): Promise<void> {
        const updateObject = {
            email: () => updateEmailUserSQL,
            password: () => updatePasswordUserSQL,
            name: () => updateNameUserSQL
        }
        for (const dtoKey in dto) {
            await this.sqlDB.query(updateObject[dtoKey](), [id, dto[dtoKey]])
        }
    }
}
