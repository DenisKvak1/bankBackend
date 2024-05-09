export enum wsClientCommands {
	DEBIT_REQUEST = 'DEBIT_REQUEST',
	DEBIT_RESPONSE = 'DEBIT_RESPONSE'
}
export enum wsServerCommands {
	DEBIT_REQUEST = 'DEBIT_REQUEST',
	DEBIT_RESPONSE = 'DEBIT_RESPONSE'
}
export type wsClientMessage = {
	command: wsClientCommands,
	payload: any
}

export type wsServerMessage = {
	status: string,
	errorText?:string
	command?: wsServerCommands
	payload?: any
}
