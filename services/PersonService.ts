import type { Person } from "~/types/person";
import { BaseService } from "./BaseService";
import type { IRepository } from "~/repositories/base/IRepository";
import { PersonRepository } from "~/repositories/person/PersonRepository";
import type { IPersonRepository } from "~/repositories/person/IPersonRepository";

const personRepository: IPersonRepository = PersonRepository;

export class PersonService extends BaseService<Person> {
    constructor() {
        super(personRepository)
    }

    async findByPhoneNumber(phoneNumber: number): Promise<Person | undefined> {
        return personRepository.findByPhoneNumber(phoneNumber);
    }
}