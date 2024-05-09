import {IPaymentRepository} from "../repository/PaymentRepository/PaymentRepository";
import {IPaymentService} from "./interface/types";
import {IPayment} from "../models/PaymentModel";
import {CreatePaymentDTO} from "../repository/PaymentRepository/dto/paymentDTO";
import {repositories} from "../../../env/config";

export class PaymentService implements IPaymentService {
    private paymentRepository: IPaymentRepository

    constructor(paymentRepository: IPaymentRepository) {
        this.paymentRepository = paymentRepository
    }

    async create(paymentData: CreatePaymentDTO): Promise<IPayment> {
        return await this.paymentRepository.create(paymentData)
    }

    deletePayment(paymentId: number): void {
        this.paymentRepository.delete(paymentId)
    }

    async getByID(paymentId: number): Promise<IPayment | undefined> {
        return await this.paymentRepository.getByID(paymentId)
    }

    async getAllPayments(accountId: number): Promise<IPayment[]> {
        return await this.paymentRepository.getAllByID(accountId)
    }
}
export const paymentService = new PaymentService(repositories.paymentRepository)