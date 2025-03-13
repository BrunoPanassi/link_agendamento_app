import type { Person } from "~/types/person";
import type { IRepository } from "../base/IRepository";

export interface IPersonRepository extends IRepository<Person> {
    findByPhoneNumber(phoneNumber: number): Promise<Person | undefined>;
}