import type { Hour } from "~/types/hour";
import { BaseService } from "./BaseService";
import { HourRepository } from "~/repositories/hour/HourRepository";

const hourRepository = HourRepository;
export class HourService extends BaseService<Hour> {
    constructor() {
        super(hourRepository)
    }

    async findByDayOfWeek(dayOfWeek: number[]) {
        return await hourRepository.findByDayOfWeek(dayOfWeek)
    }
}