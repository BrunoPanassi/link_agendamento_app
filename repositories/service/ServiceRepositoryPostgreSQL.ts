import type { Service } from "~/types/service";
import { JsonRepository } from "../base/JsonRepository";
import type { IRepository } from "../base/IRepository";

export class ServiceRepositoryPostgreSQL extends JsonRepository<Service> implements IRepository<Service>{
    constructor() {
        super('data/service.json')
    }
}