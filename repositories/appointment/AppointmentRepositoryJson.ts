import type { Appointment } from "~/types/appointment";
import { JsonRepository } from "../base/JsonRepository";

export class AppointmentRepositoryJson extends JsonRepository<Appointment> {
    constructor() {
        super('data/appointment.json')
    }

    async findBy(user: number, professional: number, sallon: number, service: number) {
        const appointment = await this.findAll();
        return appointment.filter((appoint) => {
            return (!user || appoint.userId == user) && (!professional || appoint.professionalId == professional)
                && (!sallon || appoint.sallonId == sallon) && (!service || appoint.serviceId == service)
        })
    }
}