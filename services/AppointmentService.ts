import type { Appointment } from "~/types/appointment";
import { BaseService } from "./BaseService";
import { AppontmentRepository } from "~/repositories/appointment/AppointmentRepository";
import type { IRepository } from "~/repositories/base/IRepository";
import type { IAppointmentRepository } from "~/repositories/appointment/IAppointmentRepository";

const appointmentRepository: IAppointmentRepository = AppontmentRepository;
export class AppointmentService extends BaseService<Appointment> implements IAppointmentRepository{
    constructor() {
        super(appointmentRepository)
    }

    async findBy(user: number, professional: number, sallon: number, service: number): Promise<Appointment[]> {
        return await appointmentRepository.findBy(user, professional, sallon, service);
    }
}