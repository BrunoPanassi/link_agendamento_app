export interface Appointment {
    id: number;
    userId: number;
    professionalId: number;
    sallonId: number;
    serviceId: number;
    date: string; // yyyy-mm-dd
    hour: string; // HH:mm
}