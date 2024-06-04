import {CreateCardDTO, UpdateCardDTO} from "./dto/cardDTO";
import {ICard} from "../../models/CardModel";

export type ICardRepository = {
    create(dto: CreateCardDTO): Promise<ICard>
    getByID(id: number): Promise<ICard> | undefined
    getByNumber(number: number): Promise<ICard | undefined>
    getAll(): Promise<ICard[]>
    delete(id: number): void
    deleteByNumber(number: number): void
    update(id: number, dto: UpdateCardDTO): void
}