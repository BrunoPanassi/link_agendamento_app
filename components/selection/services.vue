<template>
    <div>
      <div v-if="appointment.date" class="text-subtitle-2 mb-4 d-flex justify-space-between" >
        <div>
          <span class="font-weight-bold" >Agendados</span>
          <div class="ml-4" >
            <p>
              {{ `${appointment.serviceId} com ${appointment.professionalId}` }}
            </p>
            <p> 
              {{ `${appointment.date} às ${appointment.hour}` }}
            </p>
          </div>
        </div>
        <v-btn
          variant="tonal" 
          color="pink-darken-4"
          size="small"
          icon="mdi-arrow-right"
        >
        </v-btn>
      </div>
      <v-divider class="border-opacity-50"></v-divider>
      <p class="text-subtitle-2 my-4 font-weight-bold" >
        Para agendar
      </p>
      <div 
        class="mb-4 pb-4" 
        v-for="(service) in services">
        <div class="d-flex justify-space-between mb-2">
          <div class="d-flex justify-start">
            <v-avatar class="mr-2">
              <v-img
                :src="service.image"
              >
              </v-img>
            </v-avatar>
            <div>
                <div class="font-weight-bold">
                  {{ service.title }}
                </div>
                <p class="font-weight-regular text-pink-darken-4">
                  {{ service.time }} - {{ service.price }}
                </p>

                <div class="font-weight-light text-caption">
                  {{ service.description }}
                </div>
            </div>
          </div>
          <div>
            <v-btn
              variant="outlined" 
              color="pink-darken-4"
              size="small"
              icon="mdi-calendar"
              @click="onSelectService(service)"
            >
            </v-btn>
            <v-dialog max-width="500" v-model="serviceDialog">
              <template v-slot:default="{ isActive }">
                <v-card>
                  <v-card-title>
                    <div class="mb-2 ml-2">
                      <v-btn
                        icon="mdi-arrow-left"
                        variant="outlined"
                        size="small"
                        color="red-darken-4"
                        @click="isActive.value = false"
                      ></v-btn>
                    </div>
                  </v-card-title>
                  <v-card-text class="d-flex flex-wrap pa-0">
                    <ProfessionalDayHour 
                      :service-selected="service"
                      @on-select-appointment="onSelectAppointment"
                    />
                  </v-card-text>
                </v-card>
              </template>
            </v-dialog>
          </div>
        </div>
        <v-divider class="border-opacity-25"></v-divider>
      </div>
    </div>
</template>

<script setup lang="ts">
import ProfessionalDayHour from './professionalDayHour.vue';
import type { Service } from '~/types/service';
import type { Appointment } from '~/types/appointment';

const serviceDialog: Ref<boolean> = ref(false);
const services: Ref<Service[]> = ref([])
const serviceSelected: Ref<Service> = ref({
  id: 0,
  title: '',
  description: '',
  time: 0,
  price: ''
});

const appointment: Ref<Appointment> = ref({
  id: 0,
  userId: 0,
  professionalId: 0,
  sallonId: 0,
  serviceId: 0,
  date: "",
  hour: ""
})

const props = defineProps<{ids: number[]}>()

const fetchServices = async() => {
  const { data } = await useFetch<Service[]>(`/api/service/?ids=${props.ids}`, {
    watch: [() => props.ids]
  })
  if (data.value) services.value = data.value
}

fetchServices()

const onSelectService = (service: Service) => {
  serviceSelected.value = service
  serviceDialog.value = true;
}

const onSelectAppointment = (selectedAppointment: Appointment) => {
  appointment.value = selectedAppointment
  serviceDialog.value = false
}
</script>