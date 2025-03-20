import { AppointmentHistoryRepositoryJson } from "./AppointmentHistoryRepositoryJson"
import type { IAppointmentHistoryRepository } from "./IAppointmentHistoryRepository"

const useDatabase = process.env.USE_SQL_DB === 'true'

export const AppointmentHistoryRepository: IAppointmentHistoryRepository = useDatabase
    ? new AppointmentHistoryRepositoryJson()
    : new AppointmentHistoryRepositoryJson()