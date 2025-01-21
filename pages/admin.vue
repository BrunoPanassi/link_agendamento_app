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
            label="E-mail"
            v-model="email"
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
            label="Telefone"
            v-model="phoneNumber"
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
        <v-btn class="mt-2" color="light-green" block @click="onLogin">Logar</v-btn>
        <v-btn class="mt-2" type="submit" variant="outlined" color="cyan-darken-4" block @click="register">Cadastrar</v-btn>
        
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { getAdmin, saveAdmin } from '~/services/adminManager'
import { savePerson } from '~/services/personManager';
import { useRouter } from "vue-router"
import { Role } from '~/types/role';
import { useAuth } from '~/composables/auth';

const form = ref()
const router = useRouter()

let name: Ref<string> = ref("")
let required =  [
    (value:string|number) => {
        if (value) return true
        return 'Necessário preencher a informação.'
    },
]

let email: Ref<string> = ref("")
let phoneNumber = ref()
let password: Ref<string> = ref("")
let confirmPassword: Ref<string> = ref("")
let confirmPasswordErrorMessages: Ref<string[]> = ref([""])

const checkPassword = (confirmPassword: string) => {
    if (confirmPassword == password.value) return true
    return confirmPasswordErrorMessages.value.push("Senha não confere com a informada")
}

const loginAndGoToDashboard = (personId: number) => {
    const { login } = useAuth();
    login(personId.toString());
    router.push('/dashboard')
}


const onLogin = async () => {
    if (email.value && password.value) {
        const adminData = await getAdmin(email.value, password.value)
        if (adminData && adminData.success && adminData.data) {
            loginAndGoToDashboard(adminData.data.personId)
        }
    }
}

const register = async () => {
    const { valid } = await form.value.validate()

    if (checkPassword(confirmPassword.value) && valid) {
        try {
            let newPerson = await savePerson(name.value, phoneNumber.value, Role.admin);
            if (newPerson) {
                loginAndGoToDashboard(newPerson.id)
                await saveAdmin(newPerson.id, email.value, password.value)
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