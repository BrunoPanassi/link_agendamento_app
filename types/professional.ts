import type { Hour } from "./hour";
import type { Person } from "./person"

export interface Professional extends Person {
    email: string;
    password: string;
    description: string;
    serviceIds?: string[];
    sallonIds?: string[];
    hours?: Hour[]
}

export interface ProfessionalInfo {
    name: string;
    phoneNumber: number;
    email: string;
    description: string;
}

export interface ProfessionalPerson {
    id: number,
    name: string,
    phoneNumber: string,
    avatar?: string,
    description?: string,
    servicesId?: number[],
    sallonId?: number[]
}