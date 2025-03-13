import { JsonRepository } from "../base/JsonRepository";
import type { IRepository } from "../base/IRepository";
import type { Manager } from "~/types/manager";

export class ManagerRepositoryJson extends JsonRepository<Manager> implements IRepository<Manager>{
    constructor() {
        super('data/manager.json')
    }
}