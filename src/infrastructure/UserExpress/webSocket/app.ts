import express from 'express';
import WebSocket from 'ws';
import http from 'http';
import { WebSocketClientsController } from '../module/WebSocketClientsController';
import { wsClientCommands, wsClientMessage, wsServerMessage } from './types';
import { authorizationData } from '../../services/AuthorizationService/interfaces/types';
import { webSocketCardController } from '../../Controllers/WebSocketCardController';
import { webSocketParser } from '../../services/webSocketParser';
import { userAuthService } from '../../../../env/config';


export class WSExpressApp {
	private app = express();
	private server = http.createServer(this.app)
	private ws = new WebSocket.Server({server: this.server});
	private wsClients = new WebSocketClientsController<wsServerMessage>();
	private routes: { [key in wsClientCommands]: Function };

	constructor() {
		this.init();
	}

	private init() {
		this.setupRoutes();
		this.setupWebSocketConnection();
	}

	private setupRoutes() {
		this.routes = {
			[wsClientCommands.DEBIT_REQUEST]: (payload: any, auth: authorizationData)=> webSocketCardController.debitRequest(payload, this.wsClients, auth),
			[wsClientCommands.DEBIT_RESPONSE]: (payload: any, auth: authorizationData) => webSocketCardController.debitResponse(payload, this.wsClients, auth),
		};
	}

	private setupWebSocketConnection() {
		this.ws.on('connection', (ws: WebSocket, req: http.IncomingMessage) => {
			const jwt = new URLSearchParams(req.url?.split('?')[1] || '').get('token');
			const auth = userAuthService.getData(jwt);
			if (!auth) return ws.close();

			this.setupWebSocketHandlers(ws, auth);
			this.wsClients.addClient(auth.id, ws);
			this.ws.on('close', () => this.wsClients.removeClient(auth.id, ws));
		});
	}

	private setupWebSocketHandlers(ws: WebSocket, authorizationData:authorizationData) {
		ws.on('message', (message: string) => {
			const parsedMessage = webSocketParser.parseJson(message) as wsClientMessage;
			this.routes[parsedMessage.command](parsedMessage.payload, authorizationData);
		});
	}

	start(port: number) {
		this.server.listen(port, () => {
			console.log(`Server is running on port ${port}`);
		});
	}
}

export const webSocketApp = new WSExpressApp();