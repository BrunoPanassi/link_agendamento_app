import type { Manager } from "~/types/manager";
import type { IRepository } from "../base/IRepository";
import { ManagerRepositoryPostgreSQL } from "./ManagerRepositoryPostgreSQL";
import { ManagerRepositoryJson } from "./ManagerRepositoryJson";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const ManagerRepository: IRepository<Manager> = useDatabase
  ? new ManagerRepositoryPostgreSQL()
  : new ManagerRepositoryJson();