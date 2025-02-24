<script setup>
import { ref, provide, watch, reactive, onMounted } from 'vue'
import axios from 'axios'
import api from './axiosInstance'

import CenterPanel from './components/CenterPanel.vue'
import LeftPanel from './components/LeftPanel.vue'
import RightPanel from './components/RightPanel.vue'
import AddTransaction from './components/AddTransaction.vue'
import LoginPanel from './components/LoginPanel.vue'

const transactions = ref([]) // list of all transactions from back
const yearsInTransactions = ref([]) // years for filling <select> elements in filters
const monthesInTransactions = ref([]) // monthes for filling <select> elements in filters
const categoriesOfTransactions = ref([]) // transaction types for <select> in filters
const typesOfTransactions = ref([]) // transaction types for <select> in filters

const showLoginPanel = ref(false)

const loginRequest = reactive({
  email: '',
  password: '',
})

const loginStatus = ref(null)

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

const closeLoginPanel = () => {
  showLoginPanel.value = false
}

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
    loginStatus.value = error.status
    console.log(loginStatus.value)
  }
}

const login = async () => {
  try {
    const { status } = await api.post(`http://localhost:8080/api/auth/signin`, loginRequest)
    loginStatus.value = status
  } catch (error) {
    console.log(error)
  }
}

const logOut = async () => {
  try {
    const { data } = await api.post(`http://localhost:8080/api/auth/signout`)
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
  getData,
  applyFilters,
  resetFilters,
  transactions,
  filterParams,
})

provide('authorization', { login, logOut, loginRequest, closeLoginPanel })

provide('newTransactionAction', { financialTransactionDTO, sendNewTransaction })
provide('newTransactionWindowAction', { openSendTransactionWindow, closeSendTransactionWindow })

onMounted(async () => {
  await getData()
})

watch(loginStatus, (newStatus) => {
  if (newStatus === 401) {
    showLoginPanel.value = true
  } else if (newStatus === 200) {
    showLoginPanel.value = false
    getData()
  }
})

// watch(filterParams, getData)
// watch(financialTransactionDTO, sendNewTransaction)
</script>

<template>
  <AddTransaction v-if="isSendNewTransactionWindowOpen" />
  <div class="flex justify-between">
    <LoginPanel v-if="showLoginPanel" />
    <LeftPanel class="w-1/6" />
    <CenterPanel class="w-4/6" />
    <RightPanel class="w-2/6" />
  </div>
</template>
