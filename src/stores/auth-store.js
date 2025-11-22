import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    login(username, password) {
      // Simulación de login
      // En un caso real, aquí llamarías a tu API
      if (username && password) {
        this.user = { username }
        this.isAuthenticated = true
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
    },
  },
})
