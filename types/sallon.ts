export interface Sallon {
    id: number,
    name: string,
    description?: string,
    city: string,
    address: string,
    personId: number,
    professionals?: [number]
}