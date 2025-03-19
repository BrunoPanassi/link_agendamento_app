import type { Hour } from "~/types/hour";
import { JsonRepository } from "../base/JsonRepository";
import type { IHourRepository } from "./IHourRepository";

export class HourRepositoryJson extends JsonRepository<Hour> implements IHourRepository {
    constructor() {
        super('data/hour.json')
    }

    async findByDayOfWeek(dayOfWeek: number[]) {
        const hour = await this.findAll();
        return hour.filter(hour => dayOfWeek.includes(hour.dayOfWeek))
    }
}