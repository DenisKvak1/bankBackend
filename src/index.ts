import { expressApp } from './infrastructure/UserExpress/express';
import { webSocketApp } from './infrastructure/UserExpress/webSocket/app';


expressApp.start(3001)
webSocketApp.start(3002)
