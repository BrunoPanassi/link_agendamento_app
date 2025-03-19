import type { Hour } from "~/types/hour";
import type { IRepository } from "../base/IRepository";

export interface IHourRepository extends IRepository<Hour> {
    findByDayOfWeek(dayOfWeek: number[]): Promise<Hour[]>;
}