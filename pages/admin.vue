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
            label="E-mail"
            v-model="email"
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
        ></v-text-field>

        <p class="text-caption">* Para logar é necessário somente o telefone e senha.</p>

        <v-btn class="mt-2" color="light-green" type="submit" block @click="login">Logar</v-btn>
        <v-btn class="mt-2" type="submit" variant="outlined" color="cyan-darken-4" block @click="register">Cadastrar</v-btn>
        
        </v-form>
    </v-sheet>
</template>

<script setup lang="ts">
import { saveAdmin } from '~/services/adminManager'
import { savePerson } from '~/services/personManager';
import type { Person } from "~/types/person";
import { Role } from '~/types/role';

const form = ref()

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


const login = () => {

}

const register = async () => {
    const { valid } = await form.value.validate()

    if (checkPassword(confirmPassword.value) && valid) {
        try {
            let newPerson = await savePerson(name.value, phoneNumber.value, Role.admin);
            if (newPerson)
                saveAdmin(newPerson.id, email.value, password.value)
        } catch (e) {
            let message = "Erro no pŕocesso ao salvar uma pessoa"
            if (e instanceof Error)
                message = e.message
            throw new Error(message)
        }
    }
}

</script>