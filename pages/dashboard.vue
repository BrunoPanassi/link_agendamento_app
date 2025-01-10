<template>
    <v-sheet class="mx-auto mt-16" width="300">
       <v-form fast-fail @submit.prevent>
       <v-text-field
           label="Nome"
       ></v-text-field>

       <v-text-field
           bg-color="light-green-lighten-4"
           label="Telefone"
       ></v-text-field>

       <v-text-field
           bg-color="light-green-lighten-4"
           label="Senha"
       ></v-text-field>

       <v-text-field
           label="Confirmar senha"
       ></v-text-field>

       <p class="text-caption">* Para logar é necessário somente o telefone e senha.</p>

       <v-btn class="mt-2" color="light-green" type="submit" block @click="login">Logar</v-btn>
       <v-btn class="mt-2" type="submit" variant="outlined" color="cyan-darken-4" block @click="register">Cadastrar</v-btn>
       
       </v-form>
   </v-sheet>
</template>

<script setup lang="ts">

const login = () => {

}

const register = () => {

}

</script>