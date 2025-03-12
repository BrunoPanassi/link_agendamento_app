import type { IProfessionalRepository } from "./IProfessionalRepository";
import { ProfessionalRepositoryPostgreSQL } from "./ProfessionalRepositoryPostgreSQL";
import { ProfessionalRepositoryJson } from "./ProfessionalRepositoryJson";

const useDatabase = process.env.USE_SQL_DB === 'true';

export const ProfessionalRepository: IProfessionalRepository = useDatabase
  ? new ProfessionalRepositoryPostgreSQL()
  : new ProfessionalRepositoryJson();

