import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import ParticipantsController from './controllers/ParticipantsController';
import JudgesController from './controllers/JudgesController';
import AuthController from './controllers/AuthController';
import EvaluationsController from './controllers/EvaluationsController';

const app = express();
app.use(bodyparser.json());
app.use(cors({
    origin: ['http://localhost:4200', 'https://kata-tecnica.netlify.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use('/', AuthController);
app.use('/', EvaluationsController);
app.use('/', JudgesController);
app.use('/', ParticipantsController);

export default app;
