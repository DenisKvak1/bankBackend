import {IAccount} from "./AccountModel";

export type IPayment = {
    date: string;
    sum: number;
    from: IAccount;
    to: IAccount;
}
