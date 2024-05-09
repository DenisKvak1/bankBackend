import {CreateAccountDTO, UpdateAccountDTO} from "./dto/AccountDTO";
import {IAccount} from "../../models/AccountModel";

export type IAccountRepository = {
    create(dto: CreateAccountDTO): Promise<IAccount>;
    getByID(id: number): Promise<IAccount> | undefined;
    getByPublicID(id: string): Promise<IAccount> | undefined;
    getAll(): Promise<IAccount[]>;
    delete(id: number): void;
    deleteByPublicID(publicID: number): void;
    update(id: number, dto: UpdateAccountDTO): void;
}