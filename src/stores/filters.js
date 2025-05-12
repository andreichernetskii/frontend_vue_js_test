import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import api from '@/axiosInstance'
import { useTransactionStore } from './transactions'

export const useFilterStore = defineStore('filters', () => {
  const yearsInTransactions = ref([])
  const monthsInTransactions = ref([])
  const allCategories = ref([])
  const typesOfTransactions = ref([])
  const isLoadingOptions = ref(false)

  const params = reactive({
    year: '',
    month: '',
    financialTransactionType: '',
    category: '',
  })

  async function fetchYears() {
    try {
      const { data } = await api.get(`/api/v1/transactions/years`)

      if (data.status == 'Success') {
        yearsInTransactions.value = data.results
      }
    } catch (error) {
      console.error('Failed to fetch years from DB: ', error)
    }
  }

  async function fetchMonths() {
    try {
      const { data } = await api.get(`/api/v1/transactions/months`)

      if (data.status == 'Success') {
        monthsInTransactions.value = data.results
      }
    } catch (error) {
      console.error('Failed to fetch months from DB: ', error)
    }
  }

  async function fetchAllCategories() {
    try {
      const { data } = await api.get('/api/v1/transactions/categories')

      if (data.status == 'Success') {
        allCategories.value = data.results
      }
    } catch (error) {
      console.log('Failed to fetch months from DB: ', error)
    }
  }

  async function fetchTrasactionTypes() {
    try {
      const { data } = await api.get('/api/v1/transactions/types')

      if (data.status == 'Success') {
        typesOfTransactions.value = data.results
      }
    } catch (error) {
      console.error('Failed to fetch transactions types from DB: ', error)
    }
  }

  async function fetchOptions() {
    isLoadingOptions.value = true
    try {
      await Promise.all([fetchAllCategories(), fetchMonths(), fetchYears(), fetchTrasactionTypes()])
    } catch (error) {
      console.error('Failed to fetch one or more filter options: ', error)
    } finally {
      isLoadingOptions.value = false
    }
  }

  async function applyFilters() {
    const transactionStore = useTransactionStore()
    transactionStore.fetchTransactions()
  }

  function resetFilters() {
    params.year = ''
    params.month = ''
    params.financialTransactionType = ''
    params.category = ''

    applyFilters()
  }

  function reset() {
    yearsInTransactions.value = []
    monthsInTransactions.value = []
    allCategories.value = []
    typesOfTransactions.value = []
    params.year = ''
    params.month = ''
    params.financialTransactionType = ''
    params.category = ''
  }

  return {
    params,
    yearsInTransactions,
    monthsInTransactions,
    allCategories,
    typesOfTransactions,
    isLoadingOptions,
    fetchOptions,
    applyFilters,
    resetFilters,
    reset,
    fetchAllCategories,
    fetchMonths,
    fetchOptions,
    fetchTrasactionTypes,
    fetchYears,
  }
})
