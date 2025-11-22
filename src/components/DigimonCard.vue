<template>
  <q-card class="my-card q-ma-sm">
    <img :src="digimon.img" :alt="digimon.name" style="height: 200px; object-fit: cover" />

    <q-card-section>
      <div class="text-h6">{{ digimon.name }}</div>
      <div class="text-subtitle2">{{ digimon.level }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup>
defineProps({
  digimon: {
    type: Object,
    required: true,
  },
})
</script>

<style scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}
</style>
