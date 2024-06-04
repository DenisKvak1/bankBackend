import {IDebitRequest} from "../../models/DebitRequestModel";
import { CreateDebitRequestDTO, UpdateDebitRequestDTO } from './dto/debitRequestDTO';

export type IDebitRequestRepository = {
    create(dto: CreateDebitRequestDTO): Promise<IDebitRequest>
    getByID(id: number): Promise<IDebitRequest> | undefined
    update(id: number, dto: UpdateDebitRequestDTO): void
    getAll(): Promise<IDebitRequest[]>
    delete(id: number): void
}
