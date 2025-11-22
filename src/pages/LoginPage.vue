<template>
  <q-layout view="lHh Lpr fff">
    <q-page-container>
      <q-page class="flex flex-center bg-digimon">
        <q-card class="q-pa-md shadow-2 my_card" bordered>
          <q-card-section class="text-center">
            <div class="text-h5 text-weight-bold text-primary">DIGIMON ADVENTURE</div>
            <div class="text-grey-8">Ingresa al Mundo Digital</div>
          </q-card-section>

          <q-card-section>
            <q-form @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                filled
                type="email"
                v-model="email"
                label="Email"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Por favor ingresa tu email']"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Contraseña"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Por favor ingresa tu contraseña']"
              />

              <div>
                <q-btn
                  label="Iniciar Sesión"
                  type="submit"
                  color="accent"
                  text-color="white"
                  class="full-width text-weight-bold"
                  :loading="loading"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  try {
    const success = await authStore.login(email.value, password.value)
    if (success) {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Inicio de sesión exitoso',
      })
      router.push('/digimons')
    } else {
      $q.notify({
        color: 'red-5',
        textColor: 'white',
        icon: 'warning',
        message: 'Credenciales inválidas o error en el servidor',
      })
    }
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'red-5',
      textColor: 'white',
      icon: 'warning',
      message: 'Ocurrió un error al intentar iniciar sesión',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.bg-digimon {
  background: url('https://m.media-amazon.com/images/S/pv-target-images/e756043f646e7cd6b953d8b668e65be829c1cd355140fb75d9661089c23c396c.jpg')
    no-repeat center center fixed;
  background-size: cover;
}

.my_card {
  width: 100%;
  max-width: 400px;
  border: 2px solid #ffcc00;
  border-radius: 15px;
}
</style>
