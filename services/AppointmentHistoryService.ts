import type { AppointmentHistory } from "~/types/appointmentHistory";
import { BaseService } from "./BaseService";
import type { IAppointmentHistoryRepository } from "~/repositories/appointmentHistory/IAppointmentHistoryRepository";
import { AppointmentHistoryRepository } from "~/repositories/appointmentHistory/AppointmentHistoryRepository";

const appointmentHistoryRepository: IAppointmentHistoryRepository = AppointmentHistoryRepository;
export class AppointmentHistoryService extends BaseService<AppointmentHistory> implements IAppointmentHistoryRepository {
    constructor() {
        super(appointmentHistoryRepository)
    }

    async findByAppointmentId(appointmentId: number) {
        return appointmentHistoryRepository.findByAppointmentId(appointmentId)
    }
}