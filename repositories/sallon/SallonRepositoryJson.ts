
import { JsonRepository } from "../base/JsonRepository";
import type { IRepository } from "../base/IRepository";
import type { Sallon } from "~/types/sallon";

export class SallonRepositoryJson extends JsonRepository<Sallon> implements IRepository<Sallon>{
    constructor() {
        super('data/sallon.json')
    }
}