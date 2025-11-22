<template>
  <q-card class="bg-primary text-white q-mb-md shadow-3">
    <q-card-section>
      <div class="text-h6 q-mb-sm text-center text-secondary text-weight-bold">
        BUSCADOR DIGIMON
      </div>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-sm-6">
          <q-input
            filled
            bg-color="white"
            color="accent"
            v-model="searchName"
            label="Buscar por nombre"
            dense
            clearable
            @update:model-value="emitFilter"
          >
            <template v-slot:prepend>
              <q-icon name="search" color="primary" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-sm-6">
          <q-select
            filled
            bg-color="white"
            color="accent"
            v-model="searchLevel"
            :options="levelOptions"
            label="Filtrar por nivel"
            dense
            clearable
            @update:model-value="emitFilter"
          >
            <template v-slot:prepend>
              <q-icon name="filter_list" color="primary" />
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
