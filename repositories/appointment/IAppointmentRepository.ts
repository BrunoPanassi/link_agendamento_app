import type { Appointment } from "~/types/appointment";
import type { IRepository } from "../base/IRepository";

export interface IAppointmentRepository extends IRepository<Appointment> {
    findBy(user: number, professional: number, sallon: number, service: number): Promise<Appointment[]>;
}