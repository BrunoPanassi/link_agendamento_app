import type { Hour } from "./hour";
import type { Service } from "./service";

export interface Sallon {
    id: number,
    name: string,
    description?: string,
    city: string,
    address: string,
    hours?: Hour[],
    image?: string,
    serviceIds?: number[]
}