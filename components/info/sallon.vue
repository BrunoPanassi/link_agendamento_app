<template>
    <div class="mb-8" >
        <div class="d-flex align-center justify-center">
            <v-avatar size="150">
            <v-img
                color="surface-variant"
                src="https://images.pexels.com/photos/705255/pexels-photo-705255.jpeg"
            >
            </v-img>
            </v-avatar>
        </div>
        <div class="font-weight-black text-h6 ms-1 d-flex align-center justify-center">
            {{ sallonName }}
        </div>
        <p class="d-flex align-center justify-center text-subtitle-1">
            Especializado em auto-cuidado
        </p>
    </div>
</template>

<script setup lang="ts">
const sallonName: Ref<string> = ref("")
sallonName.value = "Estética Beleza"

</script>