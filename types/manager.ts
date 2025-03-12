import type { Person } from "./person";

export interface Manager extends Person {
    sallonIds: string[];
  }
  