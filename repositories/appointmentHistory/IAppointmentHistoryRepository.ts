import type { IRepository } from "../base/IRepository";
import type { AppointmentHistory } from "~/types/appointmentHistory";

export interface IAppointmentHistoryRepository extends IRepository<AppointmentHistory>{
    findByAppointmentId(appointmentId: number): Promise<AppointmentHistory[]>;
}