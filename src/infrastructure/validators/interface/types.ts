export type IUserValidate = {
    validateCredentials(email: string, password: string, name?: string): string
    validateEmail(email: string): boolean
    validatePassword(password: string): boolean
    validateName(name: string): boolean
}