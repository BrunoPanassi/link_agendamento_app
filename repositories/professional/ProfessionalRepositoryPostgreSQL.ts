import type { Professional } from "~/types/professional";
import { JsonRepository } from "../base/JsonRepository";
import type { IProfessionalRepository } from "./IProfessionalRepository";

export class ProfessionalRepositoryPostgreSQL extends JsonRepository<Professional> implements IProfessionalRepository{
    constructor() {
        super('data/professionals.json')
    }

    async findByEmailAndPassword(email: string, password: string) {
        const data = await this.findAll()
        const professional = data.find(p => p.email == email && p.password == password)
        return professional
    }

    async findByIds(ids: number[]) {
        const data = await this.findAll();
        const foundedIds = data.filter(p => ids.includes(p.id))
        return foundedIds.map(p => {
            return {
                name: p.name,
                phoneNumber: p.phoneNumber,
                email: p.email,
                description: p.description
            }
        })
    }
}