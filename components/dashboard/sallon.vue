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

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const items = ref([])

const newSallonDialog = ref(false)
const name = ref("")
const description = ref("")
const address = ref("")
const city = ref("")

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

const onRegisterSallon = () => {
    saveSallon(name.value, description.value, address.value, city.value)
    newSallonDialog.value = false
}

</script>

<style scoped>

</style>