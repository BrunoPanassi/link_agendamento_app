import type { Appointment } from "~/types/appointment";
import { BaseService } from "./BaseService";
import { AppontmentRepository } from "~/repositories/appointment/AppointmentRepository";
import type { IAppointmentRepository } from "~/repositories/appointment/IAppointmentRepository";
import { AppointmentHistoryService } from "./AppointmentHistoryService";

const appointmentRepository: IAppointmentRepository = AppontmentRepository;
const appointmentHistoryService = new AppointmentHistoryService()
export class AppointmentService extends BaseService<Appointment> implements IAppointmentRepository{
    constructor() {
        super(appointmentRepository)
    }

    async findBy(user: number, professional: number, sallon: number, service: number): Promise<Appointment[]> {
        return await appointmentRepository.findBy(user, professional, sallon, service);
    }

    async createAppointmentHistory(appointmentId: number) {
        const id = await appointmentHistoryService.getLastId()
        return {
            id: id,
            appointmentId: appointmentId,
            attended: true,
            cancelled: false
        }
    }

    override async create(data: Appointment): Promise<Appointment> {
        const appointmentCreated = await appointmentRepository.create(data);
        const appointmentHistory = await this.createAppointmentHistory(appointmentCreated.id)
        appointmentHistoryService.create(appointmentHistory)
        return appointmentCreated;
    }
}