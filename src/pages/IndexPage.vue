<template>
  <q-page class="q-pa-md">
    <div class="text-h4 q-mb-md text-center text-primary">Catálogo Digimon</div>

    <DigimonFilter @filter="handleFilter" />

    <div v-if="loading" class="flex flex-center q-pa-xl">
      <q-spinner color="primary" size="3em" />
    </div>

    <div v-else-if="filteredDigimons.length === 0" class="text-center q-pa-xl text-grey">
      No se encontraron Digimons con esos criterios.
    </div>

    <div v-else class="row justify-center">
      <DigimonCard v-for="digimon in filteredDigimons" :key="digimon.name" :digimon="digimon" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import axios from 'axios'
import DigimonCard from 'src/components/DigimonCard.vue'
import DigimonFilter from 'src/components/DigimonFilter.vue'

const router = useRouter()
const authStore = useAuthStore()

const digimons = ref([])
const loading = ref(true)
const filters = ref({ name: '', level: null })

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    router.push('/login')
    return
  }

  try {
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon')
    digimons.value = response.data
  } catch (error) {
    console.error('Error fetching digimons:', error)
  } finally {
    loading.value = false
  }
})

const handleFilter = (newFilters) => {
  filters.value = newFilters
}

const filteredDigimons = computed(() => {
  return digimons.value.filter((d) => {
    const nameMatch =
      !filters.value.name || d.name.toLowerCase().includes(filters.value.name.toLowerCase())
    const levelMatch = !filters.value.level || d.level === filters.value.level
    return nameMatch && levelMatch
  })
})
</script>
