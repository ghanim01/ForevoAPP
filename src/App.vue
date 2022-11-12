<template>
  <v-app theme="dark" id="app" class="bgMain">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script setup>
import { RouterView } from "vue-router";
</script>

<style scoped></style>
