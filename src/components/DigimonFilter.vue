<template>
  <q-card
    class="bg-dark text-white shadow-10"
    style="border: 2px solid #003399; border-radius: 10px"
  >
    <q-card-section>
      <div
        class="text-h6 q-mb-md text-center text-secondary text-weight-bolder"
        style="letter-spacing: 1px"
      >
        <q-icon name="radar" class="q-mr-sm" />
        DIGIVICE RADAR
      </div>

      <div class="q-gutter-y-md">
        <div>
          <div class="text-caption text-grey-4 q-mb-xs">Identificar Digimon:</div>
          <q-input
            filled
            dark
            bg-color="grey-9"
            color="secondary"
            v-model="searchName"
            placeholder="Nombre..."
            dense
            clearable
            @update:model-value="emitFilter"
            class="digi-input"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="secondary" />
            </template>
          </q-input>
        </div>

        <div>
          <div class="text-caption text-grey-4 q-mb-xs">Nivel de Poder:</div>
          <q-select
            filled
            dark
            bg-color="grey-9"
            color="secondary"
            v-model="searchLevel"
            :options="levelOptions"
            label="Seleccionar Nivel"
            dense
            clearable
            @update:model-value="emitFilter"
            class="digi-input"
          >
            <template v-slot:prepend>
              <q-icon name="signal_cellular_alt" color="secondary" />
            </template>
          </q-select>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['filter'])

const searchName = ref('')
const searchLevel = ref(null)

const levelOptions = ['Fresh', 'In Training', 'Rookie', 'Champion', 'Ultimate', 'Mega', 'Armor']

const emitFilter = () => {
  emit('filter', {
    name: searchName.value,
    level: searchLevel.value,
  })
}
</script>
