<template>
  <q-page padding>
    <q-toolbar class="bg-secondary text-white">
      <q-toolbar-title>Filtrar Digimons</q-toolbar-title>
    </q-toolbar>

    <div class="q-pa-md">
      <q-input
        filled
        v-model="searchName"
        label="Buscar por nombre"
        class="q-mb-md"
        debounce="300"
        clearable
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-select
        filled
        v-model="selectedLevel"
        :options="levels"
        label="Filtrar por nivel"
        class="q-mb-md"
        clearable
      />

      <q-spinner v-if="loading" size="50px" color="secondary" class="q-my-md" />

      <div v-else class="row q-col-gutter-md">
        <q-card
          v-for="digimon in filteredDigimons"
          :key="digimon.name"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <q-img
            :src="digimon.img"
            :alt="digimon.name"
            style="height: 200px"
            spinner-color="secondary"
          />
          <q-card-section>
            <div class="text-h6">{{ digimon.name }}</div>
            <div class="text-subtitle2">Nivel: {{ digimon.level }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const digimons = ref([])
const loading = ref(true)
const searchName = ref('')
const selectedLevel = ref(null)

const levels = [
  'Fresh',
  'In Training',
  'Rookie',
  'Champion',
  'Ultimate',
  'Mega'
]

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

const filteredDigimons = computed(() => {
  return digimons.value.filter(d => {
    const matchesName = d.name.toLowerCase().includes(searchName.value.toLowerCase())
    const matchesLevel = selectedLevel.value ? d.level === selectedLevel.value : true
    return matchesName && matchesLevel
  })
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
