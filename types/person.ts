export interface Person {
    id: number,
    name: string,
    phoneNumber: number,
    role: 'user' | 'professional' | 'manager';
}