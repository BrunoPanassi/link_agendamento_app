import type IInvteRepository from "./IInviteRepository";
import { InviteRepositoryJson } from "./InviteRepositoryJson";
import { InviteRepositoryPostgreSQL } from "./InviteRepositoryPostgreSQL";

const useDatabase = process.env.USE_SQL_DB === 'true'

export const InviteRepository: IInvteRepository = useDatabase
    ? new InviteRepositoryPostgreSQL()
    : new InviteRepositoryJson();