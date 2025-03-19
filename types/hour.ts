export interface Hour {
    id: number;
    dayOfWeek: number; // 0=Domingo, 6=Sábado
    start: string; // HH:mm
    end: string; // HH:mm
    breakStart?: string; // intervalo opcional
    breakEnd?: string;
  }
  