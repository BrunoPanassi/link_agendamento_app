import type { IRepository } from "~/repositories/base/IRepository";
import { SallonRepository } from "~/repositories/sallon/SallonRepository";
import type { Sallon } from "~/types/sallon";
import { BaseService } from "./BaseService";
import type { Hour } from "~/types/hour";


const sallonRepository:IRepository<Sallon> = SallonRepository

export class SallonService extends BaseService<Sallon> {
    constructor() {
        super(sallonRepository)
    }

    async updateSallonHours(sallonId: string, hours: Hour[]): Promise<Sallon> {
        const sallon = await this.findById(sallonId);
    
        if (sallon) {
            sallon.hours = hours;
            await this.update(sallonId, sallon);
            return sallon;
        }
        throw new Error('Salão não encontrado');
    }

    async updateSallonServices(sallonId: string, services: number[]) {
        const sallon = await this.findById(sallonId);

        if (sallon) {
            sallon.serviceIds = services
            await this.update(sallonId, sallon)
            return sallon
        }
        throw new Error('Salão não encontrado');
    }
}