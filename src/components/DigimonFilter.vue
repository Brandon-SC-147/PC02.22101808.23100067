<template>
  <div class="row q-col-gutter-md q-mb-md">
    <div class="col-12 col-sm-6">
      <q-input
        outlined
        v-model="searchName"
        label="Buscar por nombre"
        dense
        clearable
        @update:model-value="emitFilter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </div>
    <div class="col-12 col-sm-6">
      <q-select
        outlined
        v-model="searchLevel"
        :options="levelOptions"
        label="Filtrar por nivel"
        dense
        clearable
        @update:model-value="emitFilter"
      />
    </div>
  </div>
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
