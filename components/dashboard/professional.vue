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
                            {{ newPerson ? "Cadastrar Pessoa" : "Cadastrar Profissional" }}
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn icon="mdi-close" @click="dialog = !dialog" size="small" variant="outlined"></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    <v-form 
                        v-if="!newPerson"
                        @submit.prevent>
                        <v-select
                            v-model="inviteSelected"
                            :items="invites"
                            item-title="name"
                            item-value="phoneNumber"
                            label="Profissionais"
                            persistent-hint
                            return-object
                            single-line
                            @update:model-value="onSelectInvite()"
                        >
                            <template v-slot:append="">
                                <v-btn 
                                    size="small" 
                                    elevation="4" 
                                    icon="mdi-plus"
                                    color="green"
                                    @click="newPerson = true"
                                >
                                </v-btn>
                            </template>
                        </v-select>
                        <v-text-field 
                        label="Senha"
                        v-model="password"
                        required 
                        :rules="required">
                        </v-text-field>
                        <v-text-field 
                        label="Descrição"
                        v-model="description"
                        required
                        :rules="required"
                        ></v-text-field>
                        <v-select
                            v-model="serviceIdsSelected"
                            :items="services"
                            item-title="title"
                            item-value="id"
                            label="Serviços"
                            persistent-hint
                            single-line
                            multiple
                            chips
                            closable-chips
                        ></v-select>
                    </v-form>
                    <v-form
                        v-else
                        @submit.prevent
                    >
                        <p>
                            <v-btn 
                                icon="mdi-arrow-left"
                                @click="newPerson = false"
                            >
                            </v-btn>
                        </p>
                        <v-text-field 
                        label="Nome"
                        v-model="name"
                        required 
                        :rules="required">
                        </v-text-field>
                        <v-text-field 
                        label="Contato"
                        v-model="phoneNumber"
                        required
                        :rules="required"
                        ></v-text-field>
                    </v-form>
                </v-card-text>
            </v-card>
            </template>
        </v-dialog>
</template>

<script setup lang="ts">
import { getProfessionalByIds } from '~/services/professionalManager';
import { getSallonByPersonId } from '~/services/sallonManager';
import { getBySallon } from '~/services/sallonInviteManager';
import { useAuth } from '#build/imports'
import type { Person } from '~/types/person';
import type { ProfessionalPerson, Professional } from '~/types/professional';
import type { Sallon } from '~/types/sallon';
import type { SallonInvite } from '~/types/sallonInvite';
import type { Service } from '~/types/service';
import { getServiceByIds } from '~/services/serviceManager';

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

// ** -- Sallon | v-select -- **
const sallonSelected = ref<Sallon>()
const sallons = ref<Sallon[]>()
const items = ref<ProfessionalPerson[]>()

const loadData = async(userId: number) => {
    const sallon = await getSallonByPersonId(userId);
    if (sallon?.data)
        sallons.value = sallon?.data as Sallon[]
}

onMounted(async () => {
    const { userId } = useAuth()
    loadData(Number(userId.value))
})

const onSelectSallon = async () => {
    loadProfessionals()
    loadServices()
}

const newPerson = ref(false);
const services = ref<Service[]>()
const serviceIdsSelected = ref<number[]>()

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

const loadServices = async () => {
    if (sallonSelected.value?.services) {
        const data = await getServiceByIds(sallonSelected.value.services)
        services.value = data?.data
    }
}

// ** -- v-data-table -- **

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

// ** -- v-dialog -- **
let dialog = ref(false)
let invites = <Ref<ProfessionalPerson[]>>ref()
let inviteSelected = <Ref<ProfessionalPerson>>ref()
let id = <Ref<Number>>ref()
let person = <Ref<Person>>ref()
let name = <Ref<String>>ref()
let phoneNumber = <Ref<String>>ref()

let avatar = <Ref<String>>ref()
let description = <Ref<String>>ref()
let password = <Ref<String>>ref()

const onNew = async () => {
    dialog.value = true
    if (sallonSelected.value?.id) {
        const response = await getBySallon(sallonSelected.value.id)
        if (response?.success && response.data) {
            const professionalsResponse = await getProfessionalByIds(response.data.professionalIds)
            if (professionalsResponse?.success && professionalsResponse.data) {
                invites.value = professionalsResponse.data
            }
        }
    }
}

const onEdit = (item: ProfessionalPerson) => {

}

const onDelete = (item: ProfessionalPerson) => {

}

const onSelectInvite = () => {

}

</script>

<style scoped>

</style>