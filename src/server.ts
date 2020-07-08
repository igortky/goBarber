/* eslint-disable import/extensions */
import express, { response, json } from 'express';
import 'reflect-metadata';



import appointmentsRouter from './routes/appointments.router';
import usersRouter from './routes/user.router'
import sessionRouter from './routes/sessions.routes'
import './database';

const app = express();
app.use(express.json());
app.use('/appointments', appointmentsRouter);
app.use('/users', usersRouter);
app.use('/sessions', sessionRouter);
app.listen(3333);
