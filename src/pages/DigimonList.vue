<template>
  <q-page padding>
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>Lista de Digimons</q-toolbar-title>
    </q-toolbar>

    <q-spinner v-if="loading" size="50px" color="primary" class="q-my-md" />

    <div v-else class="row q-col-gutter-md q-mt-md">
      <q-card
        v-for="digimon in digimons"
        :key="digimon.name"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-img
          :src="digimon.img"
          :alt="digimon.name"
          style="height: 200px"
          spinner-color="primary"
        />
        <q-card-section>
          <div class="text-h6">{{ digimon.name }}</div>
          <div class="text-subtitle2">Nivel: {{ digimon.level }}</div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const digimons = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const response = await fetch('https://digimon-api.vercel.app/api/digimon')
    digimons.value = await response.json()
  } catch (error) {
    console.error('Error al cargar Digimons:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.q-card {
  transition: transform 0.2s;
}
.q-card:hover {
  transform: scale(1.05);
}
</style>
