import {IAccount} from "./AccountModel";

export type ICard = {
    account: IAccount
    number: number
    cvv2: number
    dateExpired: string
}