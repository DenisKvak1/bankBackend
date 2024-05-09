import { IPaymentRepository } from '../../../core/repository/PaymentRepository/PaymentRepository';
import { SQLDataBase } from '../interfaces/sql';
import { CreatePaymentDTO } from '../../../core/repository/PaymentRepository/dto/paymentDTO';
import { IPayment } from '../../../core/models/PaymentModel';
import {
	createPaymentSQL,
	deletePaymentSQL,
	getAllPaymentSQL,
	getAllByIDPaymentSQL,
	getByIDPaymentSQL,
} from '../SQLQuery/Payment.sql';

export class SQLPaymentRepository implements IPaymentRepository {
	private sqlDB: SQLDataBase;

	constructor(sqlDB: SQLDataBase) {
		this.sqlDB = sqlDB;
	}

	async create(dto: CreatePaymentDTO): Promise<IPayment> {
		const result = await this.sqlDB.query(createPaymentSQL, [dto.sum, dto.from, dto.to]);
		return result.rows[0];
	}

	delete(id: number): void {
		this.sqlDB.query(deletePaymentSQL, [id]);
	}

	async getAll(): Promise<IPayment[]> {
		const result = await this.sqlDB.query(getAllPaymentSQL);
		return result.rows;
	}

	async getAllByID(id: number): Promise<IPayment[]> {
		const result = await this.sqlDB.query(getAllByIDPaymentSQL, [id]);
		return result.rows;
	}

	async getByID(id: number): Promise<IPayment | undefined> {
		const result = await this.sqlDB.query(getByIDPaymentSQL, [id]);
		if (result.rows.length === 0) return

		return result.rows[0];
	}
}