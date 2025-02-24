<script setup>
import { ref, provide, watch, reactive } from 'vue'
import axios from 'axios'
import api from './axiosInstance'

import CenterPanel from './components/CenterPanel.vue'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'
import AddTransaction from './components/AddTransaction.vue'

const transactions = ref([]) // list of all transactions from back
const yearsInTransactions = ref([]) // years for filling <select> elements in filters
const monthesInTransactions = ref([]) // monthes for filling <select> elements in filters
const categoriesOfTransactions = ref([]) // transaction types for <select> in filters
const typesOfTransactions = ref([]) // transaction types for <select> in filters

const loginRequest = {
  email: 'demo@demo',
  password: 'demo',
}

// for updating transaction
const financialTransactionDTO = reactive({
  financialTransactionType: '',
  amount: '',
  category: '',
  date: '',
})

const filterParams = reactive({
  year: '',
  month: '',
  financialTransactionType: '',
  category: '',
})

const isSendNewTransactionWindowOpen = ref(false)

const applyFilters = () => {
  console.log('Filters applyed')
}

const resetFilters = () => {
  filterParams.year = ''
  filterParams.month = ''
  filterParams.financialTransactionType = ''
  filterParams.category = ''
}

const getData = async () => {
  try {
    // delete params with empty value
    const params = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v !== ''))

    const { data } = await api.get(`http://localhost:8080/api/v1/transactions/`, { params })

    transactions.value = data.map((obj) => ({
      ...obj,
    }))

    console.log(transactions.value.length)
  } catch (error) {
    console.log(error)
  }
}

const login = async () => {
  try {
    const { data } = await api.post(`http://localhost:8080/api/auth/signin`, loginRequest)
  } catch (error) {
    console.log(error)
  }
}

const logOut = async () => {
  try {
    const { data } = await api.post(`http://localhost:8080/api/auth/signout`)
    console.log('Logout')
  } catch (error) {
    console.log(error)
  }
}

const sendNewTransaction = async () => {
  try {
    console.log(financialTransactionDTO)
    const { data } = await api.post(
      'http://localhost:8080/api/v1/transactions/',
      financialTransactionDTO,
    )
  } catch (error) {
    console.log(error)
  }
}

const openSendTransactionWindow = () => {
  isSendNewTransactionWindowOpen.value = true
  console.log(isSendNewTransactionWindowOpen)
}

const closeSendTransactionWindow = () => {
  isSendNewTransactionWindowOpen.value = false
  console.log(isSendNewTransactionWindowOpen)
}

provide('operationFunctions', {
  login,
  logOut,
  getData,
  applyFilters,
  resetFilters,
  transactions,
  filterParams,
})

provide('newTransactionAction', { financialTransactionDTO, sendNewTransaction })
provide('newTransactionWindowAction', { openSendTransactionWindow, closeSendTransactionWindow })

// watch(filterParams, getData)
// watch(financialTransactionDTO, sendNewTransaction)
</script>

<template>
  <AddTransaction v-if="isSendNewTransactionWindowOpen" />
  <div class="flex justify-between">
    <LeftPanel class="w-1/6" />
    <CenterPanel class="w-4/6" />
    <RightPanel class="w-2/6" />
  </div>
</template>
