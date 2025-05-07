import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import ParticipantsController from "./controllers/ParticipantsController";
import JudgesController from './controllers/JudgesController';
import AuthController from './controllers/AuthController';
import EvaluationsController from './controllers/EvaluationsController';

const PORT = process.env.PORT || 3000;

const server = express();
server.use(bodyparser.json());
server.use(cors());

server.use('/', AuthController);
server.use('/', EvaluationsController);
server.use('/', JudgesController);
server.use('/', ParticipantsController);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
