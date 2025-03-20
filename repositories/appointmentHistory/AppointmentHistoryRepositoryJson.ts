import type { AppointmentHistory } from "~/types/appointmentHistory";
import { JsonRepository } from "../base/JsonRepository";

export class AppointmentHistoryRepositoryJson extends JsonRepository<AppointmentHistory> {
    constructor() {
        super('data/appointment_history.json')
    }

    async findByAppointmentId(appointmentId: number) {
        const appointmentHistory = await this.findAll();
        return appointmentHistory.filter((appoint) => appoint.appointmentId == appointmentId)
    }
}