import type { Service } from "~/types/service";
import type { IRepository } from "../base/IRepository";
import { ServiceRepositoryJson } from "./ServiceRepositoryJson";
import { ServiceRepositoryPostgreSQL } from "./ServiceRepositoryPostgreSQL";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const ServiceRepository: IRepository<Service> = useDatabase
    ? new ServiceRepositoryJson()
    : new ServiceRepositoryPostgreSQL()