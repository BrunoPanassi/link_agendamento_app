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
                    Cadastrar Serviço
                    </p>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" @click="dialog = !dialog" size="small" variant="outlined"></v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                <v-form
                    fast-fail
                    @submit.prevent
                    ref="form"
                >
                    <v-text-field 
                        label="TItle"
                        v-model="title"
                        required 
                        :rules="required"
                    ></v-text-field>
                    <v-text-field 
                        label="Descrição"
                        v-model="description"
                        required
                        :rules="required"
                    ></v-text-field>
                    <v-text-field 
                        label="Preço"
                        v-model="price"
                        required
                        :rules="required"
                    ></v-text-field>
                    <v-text-field 
                        label="Tempo"
                        v-model="time"
                    ></v-text-field>
                    <div class="d-flex align-center justify-center">
                    <v-btn 
                        type="submit" 
                        color="green"
                        @click="onRegister"
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
                    Deletar Serviço
                    </p>
                    <v-spacer></v-spacer>
                    <v-btn icon="mdi-close" @click="onCancelDelete" size="small" variant="outlined"></v-btn>
                </div>
            </v-card-title>
            <v-card-text>
                Deseja deletar o servço {{ title }} ?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" text="cancelar" variant="outlined" @click="onCancelDelete()"></v-btn>
                <v-btn color="green" text="confirmar" variant="outlined" @click="onConfirmDelete()"></v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';
import type { Sallon } from '~/types/sallon';
import { getSallonByPersonId, updateSallonById } from '~/services/sallonManager';
import { deleteServiceById, getServiceByIds, saveService, updateServiceById } from '~/services/serviceManager';

const headers = ref([
    { title: 'Título', value: 'title' },
    { title: 'Descrição', value: 'description' },
    { title: 'Ações', value: 'actions' }
])

const items = ref<Service[]>()
const sallons = ref<Sallon[]>()

const sallonSelected = ref<Sallon>()

const form = ref()
const serviceId = ref();
const title = ref<string>("");
const description = ref<string>("");
const price = ref<string>("");
const image = ref<string>("");
const time = ref<string>("");

const dialog = ref(false)
const deleteDialog = ref(false)

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

const loadData = async(userId: number) => {
    const sallon = await getSallonByPersonId(userId);
    if (sallon?.data)
        sallons.value = sallon?.data as Sallon[]
}

onMounted(async () => {
    const { userId } = useAuth()
    loadData(Number(userId.value))
})

const onConfirmDelete = async () => {
    await deleteServiceById(serviceId.value)
    if (sallonSelected.value?.id) {
        let sallonServices: number[] = updateSallonServices(serviceId.value)
        const sallonUpdated = {
            ...sallonSelected.value,
            services: sallonServices
        }
        updateSallonAndLoadData(sallonSelected.value.id, sallonUpdated)
    }
    loadServices()
    deleteDialog.value = false
}

const onCancelDelete = () => {
    title.value = ""
    deleteDialog.value = false
}

const loadServices = async (serviceIds: number[] = []) => {
    if (!serviceIds.length && sallonSelected.value?.services) {
        serviceIds = sallonSelected.value.services
    }
    if (serviceIds) {
        const serviceByIds = await getServiceByIds(serviceIds)
        if (serviceByIds?.data) {
            items.value = serviceByIds.data
        }
    }
}

const onSelectSallon = async () => {
    loadServices()
}

const onCleanValues = () => {
    title.value = ""
    description.value = ""
    price.value = ""
    time.value = ""
}

const onNew = () => {
    dialog.value = true
    onCleanValues()
}

const onFillValues = (item: Service) => {
    serviceId.value = item.id
    title.value = item.title
    description.value = item.description
    price.value = item.price
    time.value = item.time
}

const onEdit = (item: Service) => {
    dialog.value = true
    onFillValues(item)
}

const onDelete = (item: Service) => {
    serviceId.value = item.id
    title.value = item.title
    deleteDialog.value = true
}

const onClose = () => {
    dialog.value = false
}

const updateSallonAndLoadData = async (sallonId: number, sallonUpdated: Sallon) => {
    try {
        const sallonWithNewServices = await updateSallonById(sallonId, sallonUpdated);
        if (sallonWithNewServices?.data?.services) {
            loadServices(sallonWithNewServices.data.services)
        }
    } catch (e) {
        let message = "Erro no pŕocesso ao atualizar um salão"
        if (e instanceof Error)
            message = e.message
        console.error(message)
    }
}

const updateSallonServices = (serviceId: number, newEntity: boolean = true): number[] => {
    let sallonServices:number[] = [];
    if (sallonSelected?.value?.services) {
        if (isProxy(sallonSelected.value.services)) {
            sallonServices = toRaw(sallonSelected.value.services)
        } else {
            sallonServices = sallonSelected.value.services
        }
    }
    if (newEntity) {
        sallonServices.push(serviceId)
    } else {
        sallonServices.splice(sallonServices.findIndex(s => s == serviceId), 1)
    }
    return sallonServices
}

const onEditEntity = async () => {
    const data: Service = {
        id: serviceId.value,
        title: title.value,
        description: description.value,
        price: price.value,
        image: image.value,
        time: time.value
    }

    try {
        await updateServiceById(serviceId.value, data)
    } catch (e) {
        let message = "Erro no pŕocesso ao salvar um salão"
        if (e instanceof Error)
            message = e.message
        throw new Error(message)
    } finally {
        loadServices()
    }
}

const onNewEntity = async () => {
    let newData = null;
    const { valid } = await form.value.validate()
    if (valid) {
        try {
            newData = await saveService(title.value, description.value, time.value, image.value, price.value);
        } catch (e) {
            let message = "Erro no pŕocesso ao salvar um serviço"
            if (e instanceof Error)
                message = e.message
            throw new Error(message)
        } finally {
            if (newData?.id && sallonSelected.value?.id) {
                const id = newData.id
                let sallonServices: number[] = updateSallonServices(id)
                const sallonUpdated = {
                    ...sallonSelected.value,
                    services: sallonServices
                }
                updateSallonAndLoadData(sallonSelected.value.id, sallonUpdated)
            }
        }
    }
}

const onRegister = () => {
    if (serviceId.value !== null) {
        onEditEntity()
    } else {
        onNewEntity()
    }
    onClose()
}



</script>