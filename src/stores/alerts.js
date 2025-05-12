import { defineStore } from 'pinia'
import { ref } from 'vue'

import api from '@/axiosInstance'

export const useAlertStore = defineStore('alerts', () => {
  const alerts = ref([])
  const isLoading = ref(false)

  async function fetchAlerts() {
    isLoading.value = true
    try {
      const { data } = await api.get('/api/v1/alerts/')
      alerts.value = data
    } catch (error) {
      console.error('Failed to fetch alerts: ', error)
    } finally {
      isLoading.value = false
    }
  }

  // SSE

  function setAlerts(newAlerts) {
    alerts.value = newAlerts
  }

  function reset() {
    alerts.value = []
    isLoading.value = false
  }

  return {
    alerts,
    isLoading,
    fetchAlerts,
    setAlerts,
    reset,
  }
})
