<template>
    <div>
        <div>
            <p class="ml-6 font-weight-bold">Com qual profissional?</p>
            <v-select
                :menu="true"
                v-on:update:model-value="onSelectProfessional"
                v-model="professionalSelected"
                clearable
                class="ml-4" 
                :items="professionals" 
                item-title="title" 
                density="compact" 
                width="280"
            >
                <template v-slot:item="{ props, item }">
                <v-list-item
                    v-bind="props"
                    :prepend-avatar="item.raw.avatar"
                    :subtitle="item.raw.description"
                >
                </v-list-item>
                </template>
                <template v-slot:selection="{ item, index }">
                <v-avatar>
                    <v-img :src="item.raw.avatar"></v-img>
                </v-avatar>
                </template>
            </v-select>
        </div>

        <v-expansion-panels v-model="panels" multiple>
        <v-expansion-panel value="date" >
            <v-expansion-panel-title class="d-flex flex-wrap">
            <div>
                <p class="mb-2 font-weight-bold">Para qual dia?</p>
                <p>{{ showDateSelected }}</p>
            </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
            <div>
                <v-date-picker
                class="align-center justify-center"
                :min="today"
                v-model:model-value="dateSelected"
                hide-header
                title=""
                v-on:update:model-value="onUpdateDate"
                >
                </v-date-picker>
            </div>
            </v-expansion-panel-text>
        </v-expansion-panel>
        <v-expansion-panel value="hour">
            <v-expansion-panel-title class="d-flex flex-wrap">
            <div>
                <p class="mb-2 font-weight-bold">Para qual horário?</p>
                <p>{{ showHourSelected }}</p>
            </div>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
                <v-list 
                v-on:click:select="onUpdateHour"
                v-model:selected="hourSelected"
                class="overflow-auto"
                max-height="200"
                width="250"
                >
                <v-list-item
                    v-for="(item, index) in hours"
                    :key="index"
                    :value="item"
                    class="d-flex align-center justify-center"
                >
                    <v-list-item-title>{{ item }}</v-list-item-title>
                </v-list-item>
                </v-list>
            </v-expansion-panel-text>
        </v-expansion-panel>
        </v-expansion-panels>
        <div class="d-flex justify-start pa-4">
          <v-avatar class="mr-2">
            <v-img
              :src="props.serviceSelected.image"
            >
            </v-img>
          </v-avatar>
          <div>
              <p class="text-body-2 font-weight-medium">
                {{ props.serviceSelected.title }}
              </p>
              <p class="text-caption font-weight-regular text-pink-darken-4">
                {{ props.serviceSelected.time }} - {{ props.serviceSelected.price }}
              </p>
          </div>
        </div>
        <div class="d-flex align-center justify-center pa-4">
          <v-btn
            text="Confirmar"
            variant="flat"
            color="green"
            block
            @click="onConfirm"
          ></v-btn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Service } from '~/types/service';
import type { Professional } from '~/types/professional';
import type { Appointment } from '~/types/appointment';

interface Props {
  serviceSelected: Service
}

const props = defineProps<Props>();
const emit = defineEmits(['onSelectAppointment'])

const today: Ref<string> = ref(new Date(new Date().setUTCHours(0,0,0,0)).toISOString())
const professionalSelected: Ref<Professional> = ref({
  personId: 0,
  avatar: "",
  description: ""
})
const dateSelected: Ref<Date|undefined> = ref();
const hourSelected: Ref<string> = ref("")
const appointment: Ref<Appointment> = ref({
  professional: undefined,
  service: props.serviceSelected,
  date: undefined,
  hour: undefined,
  clientPhoneNumber: undefined
});

const showDateSelected = computed(() => dateSelected.value ? dateSelected.value.toISOString() : "")

const showHourSelected = computed(() => hourSelected.value.length ? `às ${hourSelected.value[0]}` : "")

const panels: Ref<Array<string>> = ref([""])

const hours = ref([
  '08:00', '09:00', '10:00',
  '11:00', '13:00', '14:00',
  '15:00', '16:00', '17:00',
  '18:00', '19:00'
])

const professionals: Ref<Professional[]> = ref([
  {
    personId: 1,
    avatar: 'https://static.vecteezy.com/system/resources/previews/038/974/578/non_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg',
    description: 'Depilação, sobrancelha'
  },
  {
    personId: 2,
    avatar: 'https://t3.ftcdn.net/jpg/01/91/85/06/360_F_191850653_IkzN9vZTtOtJ8NTKLKOp8PlaY8iCk6Ls.jpg',
    description: 'Massagem'
  },
  {
    personId: 3,
    avatar: 'https://t4.ftcdn.net/jpg/08/37/17/45/360_F_837174504_73yzX2fi79OrRg9pfC2VQAPkXT3Zwv7K.jpg',
    description: 'Hidratação do Cabelo'
  },
  {
    personId: 4,
    avatar: 'https://img.freepik.com/free-photo/confident-cheerful-young-businesswoman_1262-20881.jpg',
    description: 'Depilação Íntima'
  }
])

const onSelectProfessional = () => {
  if (!panels.value.includes("date")) {
    panels.value.push("date")
  }
}

const onUpdateDate = () => {
  if (panels.value.includes("date")) {
    panels.value.pop()
  }
  if (!panels.value.includes("hour")) {
    panels.value.push("hour")
  }
}

const setAppointmentAndEmit = () => {
  appointment.value.professional = professionalSelected.value
  appointment.value.date = dateSelected.value
  appointment.value.hour = hourSelected.value[0]
  emit('onSelectAppointment', appointment.value)
}

const onUpdateHour = () => {
  if (panels.value.includes("hour")) {
    panels.value.pop()
  }
}

const onConfirm = () => {
  setAppointmentAndEmit()
}
</script>