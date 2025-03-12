//import { UserRepositorySQL } from './UserRepositorySQL';

import type { Person } from "~/types/person";
import type { IRepository } from "../base/IRepository";
import { PersonRepositoryJson } from "./PersonRepositoryJson";
import { PersonRepositoryPostgreSQL } from "./PersonRepositoryPostgreSQL";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const PersonRepository: IRepository<Person> = useDatabase
  ? new PersonRepositoryPostgreSQL()
  : new PersonRepositoryJson();

