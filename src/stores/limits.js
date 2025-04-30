import { defineStore } from 'pinia'
import { format } from 'date-fns'
import { ref, reactive } from 'vue'

import api from '@/axiosInstance'

export const useLimitStore = defineStore('limits', () => {
  const limits = ref([])
  const limitTypes = ref([])
  const isLoading = ref(false)

  const limitDTO = reactive({
    limitType: '',
    limitAmount: '',
    category: '',
    creationDate: '',
  })

  async function fetchLimits() {
    isLoading.value = true
    try {
      const { data } = await api.get(`/api/v1/limits/`)

      if (data.status == 'Success') {
        limits.value = data.result.map((obj) => ({
          ...obj,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch limits:', error)
      limits.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function deleteLimit() {
    isLoading.value = true
    try {
      await api.delete(`/api/v1/limits/${id}`)
      await fetchLimits()
      return true
    } catch (error) {
      console.log('Failed to delete limit: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function addLimit() {
    isLoading.value = true
    try {
      limitDTO.creationDate = format(new Date(), 'yyyy-MM-dd')
      // TODO: am i need to process success status in response?
      const { data } = await api.post('/api/v1/limits/', limitDTO)
      await fetchLimits()
      return true
    } catch (error) {
      console.log('Failed to add a new limit: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function updateLimit() {
    isLoading.value = true
    try {
      limit.creationDate = format(new Date(), 'yyyy-MM-dd')
      // TODO: am i need to process success status in response?
      await api.put(`/api/v1/limits/${limitId}`, limit)
      await fetchLimits
      return true
    } catch (error) {
      console.log('Failed to update limit: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // TODO: in the filters?
  async function fetchLimitTypes() {
    try {
      const { data } = await api.get(`/api/v1/limits/types`)
      limitTypes.value = data.filter((limitType) => limitType !== 'ZERO')
    } catch (error) {
      console.error('Failed to load limits types:', error)
    }
  }

  // SSE

  function setLimits(newLimits) {
    limits.value = newLimits
  }

  function reset() {
    limits.value = []
    isLoading.value = false
  }

  return {
    limits,
    limitTypes,
    limitDTO,
    isLoading,
    fetchLimitTypes,
    fetchLimits,
    deleteLimit,
    updateLimit,
    setLimits,
    reset,
    addLimit,
  }
})
