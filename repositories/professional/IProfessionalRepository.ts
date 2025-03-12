import type { Professional, ProfessionalInfo } from "~/types/professional";
import type { IRepository } from "../base/IRepository";

export interface IProfessionalRepository extends IRepository<Professional> {
    findByEmailAndPassword(email: string, password: string): Promise<Professional | undefined>;
}