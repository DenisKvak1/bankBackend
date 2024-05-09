import {IDebitRequest} from "../../models/DebitRequestModel";
import {CreateDebitRequestDTO} from "./dto/debitRequestDTO";

export type IDebitRequestRepository = {
    create(dto: CreateDebitRequestDTO): Promise<IDebitRequest>
    getByID(id: number): Promise<IDebitRequest> | undefined
    getAll(): Promise<IDebitRequest[]>
    delete(id: number): void
}
