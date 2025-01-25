<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="items"
        >
            <template v-slot:header.actions="{ column }">
                <v-btn icon="mdi-plus" variant="tonal" size="small" color="green-darken-4" @click="newSallonDialog = true"></v-btn>
            </template>
            <template v-slot:item.actions="{ value }">
                <v-btn icon="mdi-pencil" variant="text"></v-btn>
            </template>
        </v-data-table>
        <v-dialog max-width="500" v-model="newSallonDialog" persistent>
            <template v-slot:default="{ isActive }">
            <v-card class="pa-4">
                <v-card-title>
                <div class="mb-2 ml-2 d-flex">
                    <p class="pt-2 text-body-1 text-wrap">
                    Cadastrar Salão
                    </p>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" @click="newSallonDialog = !newSallonDialog" size="small" variant="outlined"></v-btn>
                </div>
                </v-card-title>
                <v-card-text>
                <v-form @submit.prevent>
                    <v-text-field 
                    label="Nome"
                    v-model="name"
                    required 
                    :rules="required">
                    </v-text-field>
                    <v-text-field 
                    label="Descrição"
                    v-model="description"
                    required
                    :rules="required"
                    ></v-text-field>
                    <v-text-field 
                    label="Endereço"
                    v-model="address"
                    required
                    :rules="required"
                    ></v-text-field>
                    <v-text-field 
                    label="Cidade"
                    v-model="city"
                    ></v-text-field>
                    <div class="d-flex align-center justify-center">
                    <v-btn 
                        type="submit" 
                        color="green"
                        @click="onRegisterSallon"
                    >
                        Cadastrar
                    </v-btn>
                    </div>
                </v-form>
                </v-card-text>
            </v-card>
            </template>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { saveSallon } from '~/services/sallonManager'
import { useAuth } from '#build/imports'
import { getSallonByPersonId } from '~/services/sallonManager'
import type { Sallon } from '~/types/sallon'
import { updateAdminSaveSallon } from '~/services/adminManager'

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const items = ref<Sallon[]>()

const newSallonDialog = ref(false)
const name = ref("")
const description = ref("")
const address = ref("")
const city = ref("")

onMounted(async () => {
    const { userId } = useAuth()
    const sallon = await getSallonByPersonId(Number(userId.value));
    if (sallon?.data)
        items.value = sallon?.data as Sallon[]
})

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

const onRegisterSallon = async () => {
    const { userId } = useAuth()
    let newSallon = null;
    try {
        newSallon = await saveSallon(Number(userId.value), name.value, description.value, address.value, city.value)
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    } finally {
        if (newSallon) {
            const sallonId = newSallon.id //TODO: Mudar para o admin para ter sallons ao inves de sallonId, assim seria admin 1 - N sallon, com isso ao dar update atualizaria o array de sallons
            updateAdminSaveSallon(Number(userId.value), sallonId)
            items.value?.push(newSallon)
        }
    }
    newSallonDialog.value = false
}

</script>

<style scoped>

</style>