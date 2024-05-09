
export type IAuthorizationUserService = {
    createToken(data: {[key:string]: any}): string | null
    verify(token: string): boolean
    getData(token: string): authorizationData
}
export type authorizationData = {id: number, email?: string}