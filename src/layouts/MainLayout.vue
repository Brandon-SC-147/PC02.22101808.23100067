<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Digimon App </q-toolbar-title>

        <div v-if="authStore.isAuthenticated" class="q-mr-md">
          Hola, {{ authStore.user?.firstName || authStore.user?.username }}
        </div>
        <q-btn
          v-if="authStore.isAuthenticated"
          flat
          dense
          icon="logout"
          label="Salir"
          @click="handleLogout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Enlaces Digitales </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from 'src/stores/auth-store'
import EssentialLink from 'components/EssentialLink.vue'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  router.push('/login')
}

const linksList = [
  {
    title: 'Sitio Oficial',
    caption: 'digimon.net',
    icon: 'public',
    link: 'https://digimon.net/',
  },
  {
    title: 'Digimon Wiki',
    caption: 'digimon.fandom.com',
    icon: 'menu_book',
    link: 'https://digimon.fandom.com/',
  },
  {
    title: 'Juego de Cartas',
    caption: 'world.digimoncard.com',
    icon: 'style',
    link: 'https://world.digimoncard.com/',
  },
  {
    title: 'Toei Animation',
    caption: 'toei-animation.com',
    icon: 'movie',
    link: 'https://www.toei-animation.com/',
  },
  {
    title: 'Bandai Namco',
    caption: 'bandainamcoent.com',
    icon: 'games',
    link: 'https://www.bandainamcoent.com/',
  },
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
