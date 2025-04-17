import { defineStore } from "pinia";
import type { Sallon } from "~/types/sallon";

export const useSallonStore = defineStore('users', {
    state: () => ({
        sallon: {}
    }),
    actions: {
        set(sallon: Sallon) {
            this.sallon = sallon
        },
        unset() {
            this.sallon = {}
        }
    }
})