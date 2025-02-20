export interface Professional {
    personId: number,
    password: string,
    avatar?: string,
    description?: string,
    servicesId?: number[],
    sallonId?: number[]
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