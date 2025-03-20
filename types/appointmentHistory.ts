export interface AppointmentHistory {
    id: number;
    appointmentId: number;
    attended: boolean;
    cancelled: boolean;
    rating?: number; //0 - 5
    comment?: string;
}