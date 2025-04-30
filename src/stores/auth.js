import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import api from './axiosInstance'

import { useTransactionStore } from './transactions'
import { useLimitStore } from './limits'
import { useAlertStore } from './alerts'
import { useFilterStore } from './filters'
import { useSseStore } from './sse'

export const useAuthStore = defineStore('auth', () => {
  const loginStatus = ref(null)
  const showLoginPanel = ref(false)

  const loginRequest = reactive({
    email: '',
    password: '',
  })

  const signupRequest = reactive({
    email: '',
    password: '',
    demo: '',
  })

  async function login() {
    loginStatus.value = null

    try {
      const { status } = await api.post(`/api/auth/signin`, loginRequest)
      loginRequest.password = ''
      loginStatus.value = status
      if (status === 200) {
        showLoginPanel.value = false

        try {
          const transactionStore = useTransactionStore()
          const limitStore = useLimitStore()
          const alertStore = useAlertStore()
          const filterStore = useFilterStore()
          const sseStore = useSseStore()

          await Promise.all([
            transactionStore.fetchTrasactions(),
            limitStore.fetchLimits(),
            alertStore.fetchAlerts(),
            filterStore.fetchOptions(),
          ])

          sseStore.connect()
        } catch (error) {
          console.error('Error fetching data after login:', error)
        }
      } else {
        showLoginPanel.value = true
      }
    } catch (error) {
      console.error('Login failed: ', error)
      loginRequest.password = ''
      loginStatus.value = error.response?.status || 500
      if (loginStatus.value === 401) {
        showLoginPanel.value = true
      }
    }
  }

  async function logOut() {
    const sseStore = useSseStore()
    sseStore.disconnect()

    try {
      await api.post(`/api/auth/signout`)
    } catch (error) {
      console.error('Logout failed: ', error)
    } finally {
      loginStatus.value = null
      loginRequest.email = ''
      loginRequest.password = ''
      showLoginPanel.value = true

      useTransactionStore().reset()
      useLimitStore().reset()
      useAlertStore().reset()
      useFilterStore().reset()
    }
  }

  async function registerUser() {
    try {
      await api.post(`/api/auth/signup`, signupRequest)
      // TODO: here some rerouting after success sign in process
    } catch (error) {
      console.error('Registration failed: ', error)
    }
  }

  function requireLogin() {
    if (!showLoginPanel.value) {
      console.log('Require login triggered')
      loginStatus.value = 401
      showLoginPanel.value = true
      useSseStore().disconnect()
    }
  }

  function closeLoginPanel() {
    showLoginPanel.value = false
  }

  return {
    loginStatus,
    showLoginPanel,
    signupRequest,
    loginRequest,
    login,
    logOut,
    registerUser,
    requireLogin,
    closeLoginPanel,
  }
})
