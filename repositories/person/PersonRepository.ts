import { PersonRepositoryJson } from "./PersonRepositoryJson";
import { PersonRepositoryPostgreSQL } from "./PersonRepositoryPostgreSQL";
import type { IPersonRepository } from "./IPersonRepository";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const PersonRepository: IPersonRepository = useDatabase
  ? new PersonRepositoryPostgreSQL()
  : new PersonRepositoryJson();

