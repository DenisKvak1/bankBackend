import {IATM} from "../../models/ATMModel";
import {CreateATMDTO, UpdateATMDTO} from "./dto/ATMDTO";

export type IATMRepository = {
    create(dto: CreateATMDTO): Promise<IATM>
    getByID(id: number): Promise<IATM> | undefined
    getAll(): Promise<IATM[]>
    delete(id: number): void
    update(id: number, dto: UpdateATMDTO): void
}