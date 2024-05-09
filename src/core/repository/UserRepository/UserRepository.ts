import {IUser} from "../../models/UserModel";
import {CreateUserDTO, UpdateUserDTO} from "./dto/UserDTO";

export type IUserRepository = {
    create(dto: CreateUserDTO): Promise<IUser>;
    getByID(id: number): Promise<IUser> | undefined;
    getByEmail(email: string): Promise<IUser> | undefined
    getAll(): Promise<IUser[]>;
    delete(id: number): void;
    update(id: number, dto: UpdateUserDTO): void;
}