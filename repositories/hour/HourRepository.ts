import { HourRepositoryJson } from "./HourRepositoryJson";
import type { IHourRepository } from "./IHourRepository";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const HourRepository: IHourRepository = useDatabase
    ? new HourRepositoryJson()
    : new HourRepositoryJson()