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
            <q-form ref="myForm" @submit.prevent="onSubmit" class="q-gutter-md">
              <q-input
                filled
                type="email"
                v-model="email"
                label="Email"
                autocomplete="email"
                :rules="[(val) => (val && val.length > 0) || 'Por favor ingresa tu email']"
                @keydown.enter.prevent="onSubmit"
              />

              <q-input
                filled
                type="password"
                v-model="password"
                label="Contraseña"
                autocomplete="current-password"
                :rules="[(val) => (val && val.length > 0) || 'Por favor ingresa tu contraseña']"
                @keydown.enter.prevent="onSubmit"
              />

              <div>
                <q-btn
                  label="Iniciar Sesión"
                  type="submit"
                  :loading="loading"
                  color="accent"
                  text-color="white"
                  class="full-width text-weight-bold"
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
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const router = useRouter()
const authStore = useAuthStore()

const myForm = ref(null)
const email = ref('')
const password = ref('')
const loading = ref(false)

onMounted(() => {
  const savedEmail = localStorage.getItem('saved_email')
  if (savedEmail) {
    email.value = savedEmail
  }
})

const onSubmit = async () => {
  const isValid = await myForm.value.validate()
  if (!isValid) return

  loading.value = true
  localStorage.setItem('saved_email', email.value)
  try {
    // Simular espera de validación
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Intentar login en segundo plano (sin await para no bloquear)
    authStore.login(email.value, password.value).catch((e) => console.error('Login error:', e))

    // Notificación de bienvenida
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Bienvenido al Mundo Digital',
    })

    // Forzar navegación
    await router.push({ name: 'digimons' })
  } catch (error) {
    console.error('Navigation error:', error)
    // Fallback por si falla el router
    window.location.href = '#/digimons'
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
