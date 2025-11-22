<template>
  <q-card class="digi-card q-ma-sm column no-wrap">
    <div class="img-container relative-position">
      <img :src="digimon.img" :alt="digimon.name" class="digi-img" />
      <div class="scan-line"></div>
    </div>

    <q-card-section class="q-pa-sm bg-grey-9 text-white col-grow flex column justify-between">
      <div>
        <div class="text-h6 text-weight-bold text-secondary text-uppercase ellipsis">
          {{ digimon.name }}
        </div>
        <q-separator color="secondary" class="q-my-xs" />
        <div class="row items-center q-gutter-x-sm">
          <q-badge color="primary" text-color="white" :label="digimon.level" />
          <span class="text-caption text-grey-5">DATA TYPE</span>
        </div>
      </div>

      <div class="q-mt-sm">
        <div class="text-caption text-grey-4">Habilidades:</div>
        <div class="row q-gutter-xs">
          <q-chip dense size="sm" color="dark" text-color="accent" icon="flash_on"> Attack </q-chip>
          <q-chip dense size="sm" color="dark" text-color="green-4" icon="shield"> Defense </q-chip>
        </div>
      </div>

      <q-btn
        flat
        dense
        class="q-mt-sm full-width"
        color="secondary"
        label="Ver Datos"
        icon-right="arrow_forward"
        :to="'/digimons/' + digimon.name"
      />
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
.digi-card {
  width: 100%;
  max-width: 220px;
  border: 2px solid #333;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  background: #1d1d1d;
}

.digi-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 51, 153, 0.5);
  border-color: #003399;
}

.img-container {
  height: 180px;
  background: #fff;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 2px solid #333;
}

.digi-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 10px;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: rgba(0, 255, 0, 0.5);
  box-shadow: 0 0 10px #0f0;
  animation: scan 2s linear infinite;
  opacity: 0;
}

.digi-card:hover .scan-line {
  opacity: 1;
}

@keyframes scan {
  0% {
    top: 0;
  }
  100% {
    top: 100%;
  }
}
</style>
