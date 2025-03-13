import type { Person } from "~/types/person";
import { JsonRepository } from "../base/JsonRepository";
import type { IPersonRepository } from "./IPersonRepository";


export class PersonRepositoryJson extends JsonRepository<Person> implements IPersonRepository {
    constructor() {
      super('data/person.json');
    }

    async findByPhoneNumber(phoneNumber: number) {
      const data = await this.findAll()
      return data.find(item => item.phoneNumber == phoneNumber)
    }
  }
  