<template>
    <v-data-table
    :headers="headers"
    :items="items"
    >
        <template v-slot:header.actions="{ column }">
            <v-btn icon="mdi-plus" variant="tonal" size="small" color="green-darken-4"></v-btn>
        </template>
        <template v-slot:item.actions="{ value }">
            <v-btn icon="mdi-pencil" variant="text"></v-btn>
        </template>
    </v-data-table>
</template>

<script setup lang="ts">

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const items = ref([
    { name: 'Corte', description: 'Corte de Cabelo'},
    { name: 'Barba', description: 'Corte de Barba'},
    { name: 'Bigode', description: 'Corte de Bigode'}
])

</script>