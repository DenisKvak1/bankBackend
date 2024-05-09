import WebSocket from 'ws';
import { IWebSocketClientsController, WebSocketClients } from './interfaces/types';

export class WebSocketClientsController<T> implements IWebSocketClientsController<T> {
    webSocketClients: WebSocketClients = {};

    addClient(id: string | number, client: WebSocket) {
        if (this.hasWebSocketClients(id)) {
            this.webSocketClients[id].push(client);
        } else {
            this.webSocketClients[id] = [client];
        }
    }

    removeClient(id: string | number, client: WebSocket) {
        let clients = this.webSocketClients[id];

        if (!clients) return;
        clients.splice(clients.indexOf(client), 1);
    }

    dispatchByID(id: string | number, message: T) {
        let clients = this.webSocketClients[id];

        if (!clients) return;

        clients.forEach((ws) => {
            ws.send(JSON.stringify(message));
        });
    }

    dispatchAll(message: T) {
        for (const key in this.webSocketClients) {
            let clients = this.webSocketClients[key];

            clients.forEach((ws) => {
                ws.send(JSON.stringify(message));
            });
        }
    }

    dispatchAllWidthConditions(message: T, conditions: (id: string | number) => boolean) {
        for (const key in this.webSocketClients) {
            let clients = this.webSocketClients[key];

            clients.forEach((ws) => {
                if (conditions(key)) {
                    ws.send(JSON.stringify(message));
                }
            });
        }
    }

    hasWebSocketClients(id: string | number) {
        return this.webSocketClients.hasOwnProperty(id);
    }
}

