import type { IRepository } from "~/repositories/base/IRepository";
import { ManagerRepository } from "~/repositories/manager/ManagerRepository";
import type { Manager } from "~/types/manager";
import { BaseService } from "./BaseService";
import { Role } from "~/types/role";

const managerRepository: IRepository<Manager> = ManagerRepository;

export class ManagerService extends BaseService<Manager> {
    constructor() {
        super(managerRepository)
    }

    async updateManagerSallons(id: string, sallonIds: string[]): Promise<Manager> {
        const manager = await this.findById(id);
    
        if (manager && manager.role == Role.manager) {
            manager.sallonIds = sallonIds;

            await this.update(id, manager);
        
            return manager;
        }
        throw new Error('Gerente não encontrado')
    }
}