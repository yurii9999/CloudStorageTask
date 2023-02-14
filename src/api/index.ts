import express from 'express';
import expressWs from 'express-ws';
import setupSwaggerUI from './http/swaggerDocumentation';
import cors from 'cors';
import { logMiddleware } from '../middlewares/logMiddleWare';
import bodyParser from 'body-parser';
import wsHandler from './ws';

const app = expressWs(express()).app;

//Enable CORS
app.use(cors({ origin: true }));

//------------------Middlewares-------------------

app.use(logMiddleware);

//------------------------------------------------

app.use(bodyParser.json());

setupSwaggerUI(app);

//--------------------WS api----------------------

app.ws('/api', wsHandler);

//-------------------HTTP api---------------------

const routes = express.Router();

require('./http/example').default(routes);
require("./http/user").default(routes)

app.use('/api', routes);

//------------------------------------------------

export default app;
