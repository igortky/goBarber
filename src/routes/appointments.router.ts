import { Router } from 'express';
import { parseISO } from 'date-fns';
import CreateAppointmentServices from '../services/CreateAppointmentService';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import {getCustomRepository} from 'typeorm';

const appointmentsRouter = Router();


appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});
appointmentsRouter.post('/', async (request, response) => {
    try {
        const { provider, date } = request.body;
        const parseDate = parseISO(date);

        const appointmentService = new CreateAppointmentServices();
        const appointment = await appointmentService.execute({
            provider,
            date: parseDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmentsRouter;
