export interface Admin {
    personId: number,
    email: string,
    password: string,
    sallons?: [number]
}