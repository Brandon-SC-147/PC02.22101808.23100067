<template>
  <q-page class="q-pa-md bg-grey-10">
    <div class="row q-col-gutter-lg">
      <!-- Sidebar / Filter Corner -->
      <div class="col-12 col-md-3">
        <div class="sticky-top q-pt-md">
          <DigimonFilter @filter="handleFilter" />

          <q-card class="bg-dark text-white q-mt-md shadow-5" style="border: 1px solid #333">
            <q-card-section>
              <div class="text-subtitle2 text-grey-5">ESTADO DEL SISTEMA</div>
              <div class="text-h4 text-green-5 q-my-sm">{{ filteredDigimons.length }}</div>
              <div class="text-caption text-grey-6">DIGIMONS ENCONTRADOS</div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <!-- Main Content / Pokedex Grid -->
      <div class="col-12 col-md-9">
        <div
          class="text-h4 q-mb-lg text-white text-weight-bolder"
          style="font-family: sans-serif; letter-spacing: 2px"
        >
          <span class="text-primary">DIGITAL</span> DATABASE
        </div>

        <div v-if="loading" class="flex flex-center q-pa-xl">
          <q-spinner-orbit color="secondary" size="4em" />
          <div class="text-white q-ml-md">Cargando datos...</div>
        </div>

        <div v-else-if="filteredDigimons.length === 0" class="text-center q-pa-xl text-grey-5">
          <q-icon name="error_outline" size="4em" />
          <div class="text-h6 q-mt-md">No se encontraron datos compatibles.</div>
        </div>

        <div v-else class="row q-col-gutter-md">
          <div
            v-for="digimon in filteredDigimons"
            :key="digimon.name"
            class="col-12 col-sm-6 col-md-4 col-lg-3 flex justify-center"
          >
            <DigimonCard :digimon="digimon" />
          </div>
        </div>
      </div>
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
