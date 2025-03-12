import type { Sallon } from "~/types/sallon";
import type { IRepository } from "../base/IRepository";
import { SallonRepositoryJson } from "./SallonRepositoryJson";
import { SallonRepositoryPostgreSQL } from "./SallonRepositoryPostgreSQL";


const useDatabase = process.env.USE_SQL_DB === 'true';

export const SallonRepository: IRepository<Sallon> = useDatabase
    ? new SallonRepositoryJson()
    : new SallonRepositoryPostgreSQL()