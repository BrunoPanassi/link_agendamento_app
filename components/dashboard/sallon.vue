<template>
    <div>
        <v-data-table
        :headers="headers"
        :items="items"
        >
            <template v-slot:header.actions="{ column }">
                <v-btn icon="mdi-plus" variant="tonal" size="small" color="green-darken-4" @click="onNew()"></v-btn>
            </template>
            <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-pencil" variant="text" @click="onEdit(item)"></v-btn>
                <v-btn icon="mdi-delete" variant="text" @click="onDelete(item)"></v-btn>
            </template>
        </v-data-table>
        <v-dialog max-width="500" v-model="sallonDialog" persistent>
            <template v-slot:default="{ isActive }">
            <v-card class="pa-4">
                <v-card-title>
                    <div class="mb-2 ml-2 d-flex">
                        <p class="pt-2 text-body-1 text-wrap">
                        Cadastrar Salão
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn icon="mdi-close" @click="sallonDialog = !sallonDialog" size="small" variant="outlined"></v-btn>
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
        <v-dialog max-width="500" v-model="deleteDialog" persistent>
            <v-card>
                <v-card-title>
                    <div class="mb-2 ml-2 d-flex">
                        <p class="pt-2 font-weight-bold text-body-1 text-wrap">
                        Deletar Salão
                        </p>
                        <v-spacer></v-spacer>
                        <v-btn icon="mdi-close" @click="onCancelDelete" size="small" variant="outlined"></v-btn>
                    </div>
                </v-card-title>
                <v-card-text>
                    Deseja deletar o salão {{ name }} ?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text="cancelar" variant="outlined" @click="onCancelDelete()"></v-btn>
                    <v-btn color="green" text="confirmar" variant="outlined" @click="onConfirmDelete()"></v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script setup lang="ts">
import { saveSallon, getSallonByPersonId, updateSallonById, deleteSallonById } from '~/services/sallonManager'
import { useAuth } from '#build/imports'
import type { Sallon } from '~/types/sallon'
import { updateAdminSaveSallon } from '~/services/adminManager'

const headers = ref([
    { title: 'Nome', value: 'name' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const items = ref<Sallon[]>()

const sallonId = ref();
const sallonDialog = ref(false)
const deleteDialog = ref(false)
const name = ref("")
const description = ref("")
const address = ref("")
const city = ref("")

const loadData = async(userId: number) => {
    const sallon = await getSallonByPersonId(userId);
    if (sallon?.data)
        items.value = sallon?.data as Sallon[]
}

onMounted(async () => {
    const { userId } = useAuth()
    loadData(Number(userId.value))
})

const onFillSallonValues = (item: Sallon) => {
    sallonId.value = item.id
    name.value = item.name
    description.value = item.description ?? ""
    address.value = item.address
    city.value = item.city ?? ""
}

const onEdit = (item: Sallon) => {
    sallonDialog.value = true
    onFillSallonValues(item)
}

const onDelete = (item: Sallon) => {
    sallonId.value = item.id
    name.value = item.name
    deleteDialog.value = true
}

const onConfirmDelete = async () => {
    await deleteSallonById(sallonId.value)
    const { userId } = useAuth()
    loadData(Number(userId.value))
    deleteDialog.value = false
}

const onCancelDelete = () => {
    name.value = ""
    deleteDialog.value = false
}

const onCleanValues = () => {
    sallonId.value = null
    name.value = ""
    description.value = ""
    address.value = ""
    city.value = ""
}

const onNew = () => {
    sallonDialog.value = true
    onCleanValues()
}

const onClose = () => {
    sallonDialog.value = false
}

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

const getSallonsByPersonAndAddTheNewOne = async (userId: number, sallonId: number) => {
    const sallons = await getSallonByPersonId(userId)
    let sallonsId: number[] = []
    if (sallons?.data)
        sallonsId = sallons?.data?.map((s) => s.id)
    sallonsId?.push(sallonId)
    return sallonsId
}

const onNewSallon = async (userId: number) => {
    let newSallon = null;
    try {
        newSallon = await saveSallon(userId, name.value, description.value, address.value, city.value)
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    } finally {
        if (newSallon) {
            const sallonId = newSallon.id
            let sallonsId = await getSallonsByPersonAndAddTheNewOne(userId, sallonId)
            updateAdminSaveSallon(userId, sallonsId)
            items.value?.push(newSallon) //TODO: Verificar se somente o loadData ja resolveria
        }
    }
}

const onEditSallon = async (userId: number) => {
    const sallon: Sallon = {
        id: sallonId.value,
        name: name.value,
        description: description.value,
        address: address.value,
        city: city.value,
        personId: userId
    }
    try { 
        await updateSallonById(sallonId.value, sallon)
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    } finally {
        loadData(userId)
    }
}

const onRegisterSallon = async () => {
    const { userId } = useAuth()
    if (sallonId.value !== null) {
        onEditSallon(Number(userId.value))
    } else {
        onNewSallon(Number(userId.value))
    }
    onClose()
}

</script>

<style scoped>

</style>