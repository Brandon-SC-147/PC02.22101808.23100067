<template>
  <q-page class="q-pa-md bg-grey-10 text-white flex flex-center">
    <div v-if="digimon" class="row full-width" style="max-width: 1000px">
      <!-- Left Column: Image & Basic Info -->
      <div class="col-12 col-md-5 q-pa-md">
        <q-card class="bg-dark text-white shadow-10" style="border: 2px solid #003399">
          <q-card-section class="text-center">
            <img :src="digimon.img" :alt="digimon.name" class="digi-detail-img" />
          </q-card-section>
          <q-card-section>
            <div class="text-h3 text-secondary text-weight-bolder text-uppercase text-center">
              {{ digimon.name }}
            </div>
            <div class="text-center q-mt-sm">
              <q-badge color="primary" :label="digimon.level" class="text-subtitle1 q-pa-xs" />
            </div>
          </q-card-section>
        </q-card>
      </div>

      <!-- Right Column: Stats & Description (Mocked for now since API is limited) -->
      <div class="col-12 col-md-7 q-pa-md">
        <div class="text-h5 text-primary q-mb-md">DATOS DE ANÁLISIS</div>

        <q-list dark bordered separator class="rounded-borders bg-grey-9">
          <q-item>
            <q-item-section avatar>
              <q-icon name="fingerprint" color="secondary" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>NOMBRE</q-item-label>
              <q-item-label>{{ digimon.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="star" color="yellow" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>NIVEL</q-item-label>
              <q-item-label>{{ digimon.level }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>

        <div class="q-mt-lg">
          <q-btn
            outline
            color="secondary"
            icon="arrow_back"
            label="Volver a la Base de Datos"
            to="/digimons"
          />
        </div>
      </div>
    </div>

    <div v-else class="text-center">
      <q-spinner-grid color="primary" size="4em" />
      <div class="q-mt-md">Cargando datos del Digimon...</div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const digimon = ref(null)

onMounted(async () => {
  const name = route.params.name
  try {
    const response = await axios.get('https://digimon-api.vercel.app/api/digimon/name/' + name)
    if (response.data && response.data.length > 0) {
      digimon.value = response.data[0]
    }
  } catch (error) {
    console.error('Error fetching digimon details', error)
  }
})
</script>

<style scoped>
.digi-detail-img {
  width: 100%;
  max-width: 300px;
  filter: drop-shadow(0 0 15px rgba(0, 255, 255, 0.3));
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0px);
  }
}
</style>
