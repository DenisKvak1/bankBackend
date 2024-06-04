export type CreateDebitRequestDTO = {
    cardNumber: number
    cardReceiver: number
    sum: number
}
export type UpdateDebitRequestDTO = {
    finished?: boolean
    success?: boolean
}