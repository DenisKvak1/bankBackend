import { ICard } from './CardModel';

export type IDebitRequest = {
    id: number
    card_destination: ICard
    card_receiver: ICard
    sum: number
    finished: boolean
    success: boolean
}