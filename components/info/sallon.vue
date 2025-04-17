<template>
    <div class="mb-8" >
        <div class="d-flex align-center justify-center">
            <v-avatar size="150">
            <v-img
                color="surface-variant"
                :src=sallonStore.sallon.image
            >
            </v-img>
            </v-avatar>
        </div>
        <div class="font-weight-black text-h6 ms-1 d-flex align-center justify-center">
            {{ sallonStore.sallon.name }}
        </div>
        <p class="d-flex align-center justify-center text-subtitle-1">
            {{ sallonStore.sallon.description }}
        </p>
    </div>
</template>

<script setup lang="ts">

import { useSallonStore } from '~/stores/sallon';

const sallonStore = useSallonStore()

</script>