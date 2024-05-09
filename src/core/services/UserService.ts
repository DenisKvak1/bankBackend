import {IUserRepository} from "../repository/UserRepository/UserRepository";
import {CreateUserDTO} from "../repository/UserRepository/dto/UserDTO";
import {IUserService} from "./interface/types";
import {IUser} from "../models/UserModel";
import {repositories} from "../../../env/config";

export class UserService implements IUserService {
    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    deleteUser(id: number): void {
        this.userRepository.delete(id)
    }

    async getUser(email: string): Promise<IUser> {
        return await this.userRepository.getByEmail(email)
    }

    async register(registerData: CreateUserDTO): Promise<IUser> {
        return await this.userRepository.create(registerData)
    }

    async checkPassword(email:string, password: string): Promise<boolean> {
        const user = await this.userRepository.getByEmail(email)
        return user?.password === password
    }

    setName(id: number, name: string): void {
        return this.userRepository.update(id, {name})
    }

    setPassword(id: number, password: string): void {
        return this.userRepository.update(id, {password})
    }

    checkExistence(id: number): boolean {
        return Boolean(this.userRepository.getByID(id));
    }

    async checkExistenceByEmail(email: string): Promise<boolean> {
        return Boolean(await this.userRepository.getByEmail(email));
    }
}

export const userService = new UserService(repositories.userRepository)