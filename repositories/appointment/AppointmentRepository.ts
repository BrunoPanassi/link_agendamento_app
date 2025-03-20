import { AppointmentRepositoryJson } from "./AppointmentRepositoryJson";
import type { IAppointmentRepository } from "./IAppointmentRepository";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const AppontmentRepository: IAppointmentRepository = useDatabase
    ? new AppointmentRepositoryJson()
    : new AppointmentRepositoryJson()