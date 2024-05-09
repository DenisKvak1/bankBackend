export type CreateUserDTO = {
    email: string;
    password: string;
    name: string;
};
export type UpdateUserDTO = {
    email?: string;
    password?: string;
    name?: string;
};
