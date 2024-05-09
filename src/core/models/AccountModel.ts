import {IUser} from "./UserModel";

export type IAccount = {
    id: number;
    owner: IUser;
    balance: number;
    publicID: number;
}