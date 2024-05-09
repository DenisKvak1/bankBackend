export type CreateCardDTO = {
    account_id: number,
    date_expired: string
}
export type UpdateCardDTO = {
    account_id: number
    cvv2: number
}