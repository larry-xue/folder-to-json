<script setup lang="ts">
import Navbar from '~/components/layout/Navbar.vue'

</script>

<template>
  <div class=" w-full md:w-2/3 mx-auto">
    <Navbar />

    <NuxtPage keepalive />
  </div>
</template>
