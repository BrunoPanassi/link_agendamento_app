import type { Person } from "~/types/person";
import { JsonRepository } from "../base/JsonRepository";
import type { IPersonRepository } from "./IPersonRepository";


export class PersonRepositoryPostgreSQL extends JsonRepository<Person> implements IPersonRepository {
    constructor() {
      super('src/data/persons.json'); //TODO: Quando for implementar, trocar para a conexão correta com PostgreSQL, junto com o extends
    }

    async findByPhoneNumber(phoneNumber: number) {
      const data = await this.findAll()
      return data.find(item => item.phoneNumber == phoneNumber)
    }
  }
  