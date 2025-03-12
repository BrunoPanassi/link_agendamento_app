import type { Person } from "~/types/person";
import { JsonRepository } from "../base/JsonRepository";


export class PersonRepositoryJson extends JsonRepository<Person> {
    constructor() {
      super('data/person.json');
    }
  }
  