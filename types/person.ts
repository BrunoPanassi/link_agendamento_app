import type { Role } from "./role";

export interface Person {
    id: number,
    name: string,
    phoneNumber: number,
    roles: Role[]
}