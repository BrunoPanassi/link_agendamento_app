import type { Professional } from "~/types/professional";
import { JsonRepository } from "../base/JsonRepository";
import type { IProfessionalRepository } from "./IProfessionalRepository";

export class ProfessionalRepositoryJson extends JsonRepository<Professional> implements IProfessionalRepository{
    constructor() {
        super('data/professional.json')
    }

    async findByEmailAndPassword(email: string, password: string) {
        const data = await this.findAll()
        const professional = data.find(p => p.email == email && p.password == password)
        return professional
    }
}