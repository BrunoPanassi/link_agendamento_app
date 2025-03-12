import type { Service } from "~/types/service";
import { JsonRepository } from "../base/JsonRepository";
import type { IRepository } from "../base/IRepository";

export class ServiceRepositoryJson extends JsonRepository<Service> implements IRepository<Service>{
    constructor() {
        super('data/service.json')
    }
}