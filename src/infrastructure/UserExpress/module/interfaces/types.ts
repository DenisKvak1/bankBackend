export type WebSocketClients = { [key: string]: Array<WebSocket> }
export type IWebSocketClientsController<T> = {
	addClient: (id: number | string, client: WebSocket) => void
	removeClient: (id: number | string, client: WebSocket) => void
	dispatchByID: (id: number | string, message: T) => void
	dispatchAll: (message: T) => void
	dispatchAllWidthConditions: (message: T, conditions: (id: number | string) => boolean) => void
}