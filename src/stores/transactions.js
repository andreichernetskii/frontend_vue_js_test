import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'

import api from '@/axiosInstance'
import { useFilterStore } from './filters'

export const useTransactionStore = defineStore('transactions', () => {
  const transactions = ref([])
  const isLoading = ref(false)

  const financialTransactionDTO = reactive({
    id: '',
    financialTransactionType: '',
    amount: '',
    category: '',
    date: '',
  })

  async function fetchTransactions() {
    isLoading.value = true
    const filterStore = useFilterStore()
    const params = Object.fromEntries(
      Object.entries(filterStore.params).filter(([_, v]) => v !== '' && v != null),
    )

    try {
      const { data } = await api.get(`/api/v1/transactions/`, { params })

      if (data.status == 'Success') {
        transactions.value = data.results.map((obj) => ({
          ...obj,
        }))
      }
    } catch (error) {
      console.error('Failed to fetch transactions: ', error)
      transactions.value = []
    } finally {
      isLoading.value = false
    }
  }

  async function addTransaction(financialTransactionDTO) {
    isLoading.value = true
    try {
      // TODO: am i need to process success status in response?
      const { data } = await api.post('/api/v1/transactions/', financialTransactionDTO)
      return true
    } catch (error) {
      console.error('Failed to add transaction: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function updateTransaction(financialTransactionDTO) {
    isLoading.value = true
    try {
      // TODO: am i need to process success status in response?
      await api.put(`/api/v1/transactions/${financialTransactionDTO.id}`, financialTransactionDTO)
      // await fetchTransactions()
      return true
    } catch (error) {
      console.error('Failed to update transaction: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  async function deleteTransaction(id) {
    isLoading.value = true
    try {
      await api.delete(`/api/v1/transactions/${id}`)
      // await fetchTransactions()
      return true
    } catch (error) {
      console.error('Failed to delete transaction: ', error)
      return false
    } finally {
      isLoading.value = false
    }
  }

  // for new data from SSE

  function setTransactions(newTransactions) {
    console.log('new list of transactions')

    transactions.value = newTransactions
  }

  function reset() {
    transactions.value = []
    isLoading.value = false
  }

  return {
    transactions,
    financialTransactionDTO,
    isLoading,
    fetchTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    setTransactions,
    reset,
  }
})
