import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    token: null,
  }),
  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
  },
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post(
          'https://storedb-api.onrender.com/node-api/users/signin',
          {
            email,
            password,
          },
        )

        if (response.status === 200) {
          this.user = {
            username: email,
            firstName: response.data.firstName,
            lastName: response.data.lastName,
            email: response.data.email,
            id: response.data.id,
          }
          this.isAuthenticated = true
          this.token = response.data.token
          return true
        }
        return false
      } catch (error) {
        console.error('Login error:', error)
        return false
      }
    },
    logout() {
      this.user = null
      this.isAuthenticated = false
      this.token = null
    },
  },
})
