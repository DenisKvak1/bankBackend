import { expressApp } from './infrastructure/UserExpress/express';
import { webSocketApp } from './infrastructure/UserExpress/webSocket/app';


expressApp.start(3000)
webSocketApp.start(3001)
