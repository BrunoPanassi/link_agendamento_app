<template>
    <v-card>
        <v-layout>
            <v-app-bar
            color="green-darken-1"
            prominent
            >
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>
                    {{ menuSelectedTitle }}
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn icon="mdi-account-circle" variant="text"></v-btn>
            </v-app-bar>

            <v-navigation-drawer
                v-model="drawer"
                :location="$vuetify.display.mobile ? 'bottom' : undefined"
                temporary
            >
                <v-list>
                    <v-list-item
                        v-for="item in menu"
                        :key="item.value"
                        :title="item.title"
                        @click="onSelectItem(item.value)"
                    ></v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 500px;">
                <v-card-text>
                    <services v-show="menuSelected == 'services'"></services>
                    <sallon v-show="menuSelected == 'sallon'"></sallon>
                </v-card-text>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth'
})
import services from '~/components/dashboard/services.vue';
import sallon from '~/components/dashboard/sallon.vue';

const drawer = ref(false)

const menuSelected = ref("")

const menu = [
        {
          title: 'Salão',
          value: 'sallon',
        },
        {
          title: 'Serviços',
          value: 'services',
        },
        {
          title: 'Horários',
          value: 'hours',
        },
        {
          title: 'Vagas',
          value: 'vacance',
        },
      ]

const menuSelectedTitle = computed(() => menu.find(v => v.value == menuSelected.value)?.title ?? "Dashboard")

const onSelectItem = (value: string) => {
    menuSelected.value = value
}

</script>