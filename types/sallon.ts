import type { Hour } from "./hour";

export interface Sallon {
    id: number,
    name: string,
    description?: string,
    city: string,
    address: string,
    hours?: Hour[]
}