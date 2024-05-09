import {IUserValidate} from "./interface/types";

export class UserValidator implements IUserValidate {
    validateCredentials(email: string, password: string, name?: string): string {
        if(!this.validateEmail(email)) return 'Email не корретен'
        if(!this.validatePassword(password)) return 'Пароль не корретен'
        if(!this.validateName(name)) return 'Имя не корректно'
    }

    validateEmail(email: string): boolean {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePassword(password: string): boolean {
        const passwordRegex: RegExp = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d\-_]{8,}$/
        return passwordRegex.test(password);
    }

    validateName(name: string): boolean {
        const nameRegex: RegExp = /^[a-zA-Z\s-]+$/;
        return nameRegex.test(name);
    }
}

export const userValidator = new UserValidator()