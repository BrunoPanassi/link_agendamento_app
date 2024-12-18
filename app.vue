<template>
  <v-card class="mx-auto" max-width="400">
    <v-card-title>
      <Sallon />
    </v-card-title>

    <v-card-text>
      <Services />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import Services from './components/selection/services.vue';
import Sallon from './components/info/sallon.vue';

</script>