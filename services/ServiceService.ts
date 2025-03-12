import type { IRepository } from "~/repositories/base/IRepository";
import { ServiceRepository } from "~/repositories/service/ServiceRepository";
import type { Service } from "~/types/service";
import { BaseService } from "./BaseService";

const serviceRepository: IRepository<Service> = ServiceRepository

export class ServiceService extends BaseService<Service> {
    constructor() {
        super(serviceRepository)
    }
}