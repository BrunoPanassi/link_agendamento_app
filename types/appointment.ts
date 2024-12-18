import type { Professional } from '~/types/professional';
import type { Service } from './service';

export interface Appointment {
    professional: Professional| undefined,
    service: Service,
    date: Date | undefined,
    hour: string | undefined,
    clientPhoneNumber: string | undefined
}