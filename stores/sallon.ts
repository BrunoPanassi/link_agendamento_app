import { defineStore } from "pinia";
import type { Sallon } from "~/types/sallon";

export const useSallonStore = defineStore('sallon', {
    state: () => ({
        sallon: {} as Sallon,
        loading: false
    }),
    actions: {
        async fetchSallon(id: number) {
            this.loading = true
            const { data } = await useFetch<Sallon>(`/api/sallon/?id=${id}`)
            if (data.value) {
                this.sallon = data.value
            }
            this.loading = false
        },
        set(sallon: Sallon) {
            this.sallon = sallon
        },
        unset() {
            this.sallon = {} as Sallon
        }
    }
})