<template>
    <div class="mb-8" >
        <div class="d-flex align-center justify-center">
            <v-avatar size="150">
            <v-img
                color="surface-variant"
                :src=sallon.image
            >
            </v-img>
            </v-avatar>
        </div>
        <div class="font-weight-black text-h6 ms-1 d-flex align-center justify-center">
            {{ sallon.name }}
        </div>
        <p class="d-flex align-center justify-center text-subtitle-1">
            {{ sallon.description }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps(['id'])
import type { Sallon } from '~/types/sallon'

const sallon: Ref<Sallon> = ref({
    id: 0,
    name: '',
    city: '',
    address: ''
});

const buscarSalao = async () => {
    const { data } = await useFetch<Sallon>(`/api/sallon/?id=${props.id}`)
    if (data.value) {
        sallon.value = data.value
    }
}

watchEffect(() => {
  if (props.id) {
    buscarSalao()
  }
})

</script>