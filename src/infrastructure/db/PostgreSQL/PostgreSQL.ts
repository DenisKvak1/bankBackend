import {Pool, QueryResult} from "pg";
import {SQLDataBase} from "../interfaces/sql";

export class PostgreSQL implements SQLDataBase{
    private pool: Pool

    constructor() {
        this.init()
    }

    private init() {
        this.initPg()
    }

    private initPg() {
        this.pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'postgres',
            password: 'Denis457',
            port: 5432,
        });
    }

    async query(text: string, values: any[] = []): Promise<any> {
        return await this.pool.query(text, values)
    }
}
export const postgreSQL = new PostgreSQL()