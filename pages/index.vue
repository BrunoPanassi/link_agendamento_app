<template>
    <v-card class="mx-auto" max-width="400">
      <v-card-title>
        <Sallon />
      </v-card-title>
  
      <v-card-text>
        <Services />
      </v-card-text>
  
      <v-dialog max-width="500" v-model="userDialog" persistent>
        <template v-slot:default="{ isActive }">
          <v-card class="pa-4">
            <v-card-title>
              <div class="mb-2 ml-2">
                <p class="pt-2 text-body-1 text-wrap">
                  Para agendar, precisamos apenas do seu nome e do seu telefone
                </p>
              </div>
            </v-card-title>
            <v-card-text>
              <v-form @submit.prevent>
                <v-text-field 
                  label="Nome"
                  v-model="userName"
                  required 
                  :rules="nameRules">
                </v-text-field>
                <v-text-field 
                  label="Telefone"
                  v-model="userPhoneNumber"
                  required
                  :rules="phoneNumberRules"
                ></v-text-field>
                <div class="d-flex align-center justify-center">
                  <v-btn 
                    type="submit" 
                    color="green"
                    @click="onRegisterUser"
                  >
                    Cadastrar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import Services from '../components/selection/services.vue';
  import Sallon from '../components/info/sallon.vue';
  
  const userDialog = ref(false);
  
  const userName = ref("")
  const nameRules = [ (value: string) => !!value || 'Nome é obrigatório.', ]
  
  const userPhoneNumber = ref()
  const phoneNumberRules = [ (value: string) => !!value || 'Nùmero de telefone é obrigatório.', ]
  
  const onRegisterUser = () => {
    localStorage.setItem('userNameAndPhoneNumber', JSON.stringify({
      name: userName.value,
      phoneNumber: userPhoneNumber.value
    }))
    userDialog.value = false
  }
  
  onMounted(() => {
    if (!localStorage.getItem('userNameAndPhoneNumber')) {
      userDialog.value = true
    }
  })
  
  </script>