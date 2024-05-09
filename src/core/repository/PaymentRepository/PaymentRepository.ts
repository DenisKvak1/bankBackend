import {CreatePaymentDTO} from "./dto/paymentDTO";
import {IPayment} from "../../models/PaymentModel";

export type IPaymentRepository = {
    create(dto: CreatePaymentDTO): Promise<IPayment>
    getByID(id: number): Promise<IPayment> | undefined;
    getAllByID(id: number): Promise<IPayment[]>
    getAll(): Promise<IPayment[]>;
    delete(id: number): void;
}
