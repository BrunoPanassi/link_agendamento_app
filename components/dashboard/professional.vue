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
</template>

<script setup lang="ts">
import { getProfessionalByIds } from '~/services/professionalManager';
import type { Professional } from '~/types/professional';
import type { Sallon } from '~/types/sallon';

// ** -- Sallon | v-select -- **
const sallonSelected = ref<Sallon>()
const sallons = ref<Sallon[]>()
const items = ref<Professional[]>()

const onSelectSallon = async () => {
    loadProfessionals()
}

const loadProfessionals = async (ids: number[] = []) => {
    if (!ids.length && sallonSelected.value?.professionals) {
        ids = sallonSelected.value.professionals
    }
    if (ids) {
        const serviceByIds = await getProfessionalByIds(ids)
        if (serviceByIds?.data) {
            items.value = serviceByIds.data
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

const onEdit = (item: Professional) => {

}

const onDelete = (item: Professional) => {

}

</script>

<style scoped>

</style>