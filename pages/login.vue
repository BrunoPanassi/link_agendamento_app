<template>
    <v-sheet class="mx-auto mt-16" width="300">
       <v-form 
        fast-fail 
        @submit.prevent
        ref="form"
    >
       <v-text-field
           label="Nome"
           v-model="name"
           :rules="required"
       ></v-text-field>

       <v-text-field
           bg-color="light-green-lighten-4"
           label="Telefone"
           v-model="phoneNumber"
           :rules="required"
       ></v-text-field>

       <v-text-field
           bg-color="light-green-lighten-4"
           label="Senha"
           type="password"
           v-model="password"
           :rules="required"
       ></v-text-field>

       <v-text-field
           label="Confirmar senha"
           :disabled="!password"
            type="password"
            v-model="confirmPassword"
            :error-messages="confirmPasswordErrorMessages"
       ></v-text-field>

       <p class="text-caption">* Para logar é necessário somente o telefone e senha.</p>

       <v-btn class="mt-2" color="light-green" block @click="login">Logar</v-btn>
       <v-btn class="mt-2" type="submit" variant="outlined" color="cyan-darken-4" block @click="register">Cadastrar</v-btn>
       
       </v-form>
   </v-sheet>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
import { getPerson, savePerson } from '~/services/personManager'
import { getProfessional, saveProfessional } from '~/services/professionalManager'
import { Role } from '~/types/role'

const form = ref()
const router = useRouter()

const AUTH_INFO = '0312813' // TODO: Save as enviroment variable

let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

let name: Ref<string> = ref("")
let phoneNumber = ref()
let password: Ref<string> = ref("")
let confirmPassword: Ref<string> = ref("")
let confirmPasswordErrorMessages: Ref<string[]> = ref([])

const pushToDashboardAndAuthSession = (authInfo: string, personId: number) => {
    sessionStorage.setItem('auth', JSON.stringify({ authInfo, personId }))
    router.push('/dashboard')
}

const checkPassword = (confirmPassword: string) => {
    if (confirmPassword == password.value) {
        confirmPasswordErrorMessages.value.pop()
        return true
    }
    return confirmPasswordErrorMessages.value.push("Senha não confere com a informada")
}

const login = async () => {
    if (phoneNumber.value && password.value) {
        const person = await getPerson(phoneNumber.value)
        if (person?.data?.id) {
            const professionalData = await getProfessional(person.data.id, password.value)
            if (professionalData?.data?.personId) {
                pushToDashboardAndAuthSession(AUTH_INFO, person.data.id)
            }
            if (professionalData?.message)
                console.error(professionalData.message)
        }
        if (person?.message)
            console.error(person.message)
    }
}

const register = async () => {
    const { valid } = await form.value.validate()
    if (checkPassword(confirmPassword.value) && valid) {
        try {
            let newPerson = await savePerson(name.value, phoneNumber.value, Role.professional);
            if (newPerson) {
                pushToDashboardAndAuthSession(AUTH_INFO, newPerson.id)
                await saveProfessional({
                    personId: newPerson.id, 
                    password: password.value
                })
            }
        } catch (e) {
            let message = "Erro no pŕocesso ao salvar uma pessoa"
            if (e instanceof Error)
                message = e.message
            throw new Error(message)
        }
    }
}

</script>