<template>
    <v-select
        v-model="sallonSelected"
        :items="sallons"
        item-title="name"
        item-value="id"
        label="Salão"
        persistent-hint
        return-object
        single-line
        @update:model-value="onSelectSallon()"
    ></v-select>
    <v-data-table
        :headers="headers"
        :items="items"
    >
        <template v-slot:header.actions="{ column }">
            <v-btn icon="mdi-plus" variant="tonal" size="small" color="green-darken-4"
                @click="onNew()"></v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
            <v-btn icon="mdi-pencil" variant="text" @click="onEdit(item)"></v-btn>
            <v-btn icon="mdi-delete" variant="text" @click="onDelete(item)"></v-btn>
        </template>
    </v-data-table>
    <v-dialog max-width="500" v-model="dialog" persistent>
            <template v-slot:default="{ isActive }">
            <v-card class="pa-4">
                <v-card-title>
                    <div class="mb-2 ml-2 d-flex">
                        <p class="pt-2 text-body-1 text-wrap">
                        Cadastrar Profissional
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn icon="mdi-close" @click="dialog = !dialog" size="small" variant="outlined"></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form @submit.prevent>
                        
                    </v-form>
                </v-card-text>
            </v-card>
            </template>
        </v-dialog>
</template>

<script setup lang="ts">
import { getProfessionalByIds } from '~/services/professionalManager';
import type { Person } from '~/types/person';
import type { ProfessionalPerson, Professional } from '~/types/professional';
import type { Sallon } from '~/types/sallon';
import type { Service } from '~/types/service';

// ** -- Sallon | v-select -- **
const sallonSelected = ref<Sallon>()
const sallons = ref<Sallon[]>()
const items = ref<ProfessionalPerson[]>()

const onSelectSallon = async () => {
    loadProfessionals()
}

const loadProfessionals = async (ids: number[] = []) => {
    if (!ids.length && sallonSelected.value?.professionals) {
        ids = sallonSelected.value.professionals
    }
    if (ids) {
        const professionalByIds = await getProfessionalByIds(ids)
        if (professionalByIds?.data) {
            items.value = professionalByIds.data
        }
    }
}

// ** -- v-data-table -- **

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const onNew = () => {

}

const onEdit = (item: ProfessionalPerson) => {

}

const onDelete = (item: ProfessionalPerson) => {

}

// ** -- v-dialog -- **
const dialog = ref(false)
const id = <Ref<Number>>ref()
const person = <Ref<Person>>ref()
const phoneNumber = <Ref<String>>ref()
const avatar = <Ref<String>>ref()
const description = <Ref<String>>ref()
const services = <Ref<Service>>ref()
const servicesIds = <Ref<Number>>ref()

</script>

<style scoped>

</style>