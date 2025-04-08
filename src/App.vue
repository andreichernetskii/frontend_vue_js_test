<script setup>
import { ref, provide, watch, reactive, onMounted } from 'vue'
import api from './axiosInstance'

import CenterPanel from './components/CenterPanel.vue'
import LeftPanel from './components/LeftPanel.vue'
import LimitsPanel from './components/LimitsPanel.vue'
import LoginPanel from './components/LoginPanel.vue'
import RegisterPanel from './components/RegisterPanel.vue'

const transactions = ref([]) // list of all transactions from back

const yearsInTransactions = ref([]) // years for filling <select> elements in filters
const monthesInTransactions = ref([]) // monthes for filling <select> elements in filters
const allCategories = ref([]) // transaction types for <select> in filters
const typesOfTransactions = ref([]) // transaction types for <select> in filters

const showLoginPanel = ref(false)

const loginStatus = ref(null)

const isSendNewTransactionWindowOpen = ref(false)

const isShowRegistrationPanel = ref(false)

const childRef = ref(null)

const fetchYears = async () => {
  try {
    const { data } = await api.get(`/api/v1/transactions/years`)
    yearsInTransactions.value = data
    console.log('years: ', yearsInTransactions.value)
  } catch (error) {
    console.error(error)
  }
}

const fetchMonths = async () => {
  try {
    const { data } = await api.get(`/api/v1/transactions/months`)
    monthesInTransactions.value = data
    console.log('months: ', monthesInTransactions.value)
  } catch (error) {
    console.error(error)
  }
}

// LIMITS

const limits = ref([])

const fetchLimitsData = async () => {
  try {
    const { data } = await api.get(`/api/v1/limits/`)

    limits.value = data.map((obj) => ({
      ...obj,
    }))
    console.log(limits.value)
  } catch (error) {
    console.log(error)
  }
}

//

const fetchAllCategories = async () => {
  try {
    const { data } = await api.get('/api/v1/transactions/categories')
    allCategories.value = data
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
  }
}

const fetchTrasactionTypes = async () => {
  try {
    const { data } = await api.get('/api/v1/transactions/types')
    typesOfTransactions.value = data
  } catch (error) {
    console.error(error)
  }
}

const loginRequest = reactive({
  email: '',
  password: '',
})

const signupRequest = reactive({
  email: '',
  password: '',
  demo: '',
})

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

  getData()
}

const getData = async () => {
  try {
    // delete params with empty value
    const params = Object.fromEntries(Object.entries(filterParams).filter(([_, v]) => v !== ''))

    const { data } = await api.get(`/api/v1/transactions/`, { params })

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

const registerUser = async () => {
  try {
    await api.post(`/api/auth/signup`, signupRequest)
  } catch (error) {
    console.error()
  }
}

const showRegisterPanel = () => {
  isShowRegistrationPanel.value = true
}

const hideRegisterPanel = () => {
  isShowRegistrationPanel.value = false
}

const login = async () => {
  try {
    const { status } = await api.post(`/api/auth/signin`, loginRequest)
    console.log(loginRequest)
    loginStatus.value = status
  } catch (error) {
    console.log(error)
  }
}

const logOut = async () => {
  try {
    const { data } = await api.post(`/api/auth/signout`)
  } catch (error) {
    console.log(error)
  }
}

const sendNewTransaction = async () => {
  try {
    console.log(financialTransactionDTO)
    await api.post('/api/v1/transactions/', financialTransactionDTO)
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
    console.log(loginStatus.value)
  }
}

const updateTransaction = async (financialTransaction) => {
  try {
    await api.put('/api/v1/transactions/', financialTransaction)
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
    console.log(loginStatus.value)
  }
}

const deleteTransaction = async (id) => {
  try {
    await api.delete(`/api/v1/transactions/${id}`)
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

// SSE

const connectionStatus = ref(null)
let eventSource = null

// connect to SSE on server
const connectToAlertStream = () => {
  // close connection if exist
  if (eventSource) {
    eventSource.close()
  }

  // new SSE connection
  eventSource = new EventSource('http://localhost:8080/api/stream/subscribe', {
    withCredentials: true,
  })

  // connection opened event handler
  eventSource.onopen = () => {
    connectionStatus.value = {
      type: 'success',
      message: 'Connection established',
    }
    console.log(connectionStatus.value)
  }

  // connected event handler
  eventSource.addEventListener('connected', (event) => {
    connectionStatus.value = {
      type: 'success',
      message: event.data,
    }
    console.log(connectionStatus.value)
  })

  // default message handler
  eventSource.onmessage = (event) => {
    try {
      console.log(event.data)
      processResponse(JSON.parse(event.data))
    } catch (error) {
      console.error('Error: ', error)
    }
  }

  // error handler
  eventSource.onerror = (error) => {
    connectionStatus.value = {
      type: 'error',
      message: 'Connection error. Reconnecting...',
    }
    console.log(connectionStatus.value)

    if (eventSource.readyState !== EventSource.CLOSED) {
      eventSource.close()
    }
  }

  // onclose event
  eventSource.addEventListener('close', () => {
    connectionStatus.value = {
      type: 'warning',
      message: 'Disconnected. Reconnecting in 5 seconds...',
    }
    console.log(connectionStatus.value)

    setTimeout(connectToAlertStream, 5000)
  })
}

const processResponse = (data) => {
  switch (data.eventType) {
    case 'TRANSACTIONS_ALL':
      transactions.value = data.data.map((obj) => ({
        ...obj,
      }))
      break

    case 'LIMITS_ALL':
      limits.value = data.data.map((obj) => ({
        ...obj,
      }))
      console.log(limits.value)

      break

    case 'ALERTS_ALL':
      alerts.value = data.data
      break

    default:
      console.error(`${data.eventType}: Unknown type of event!`)
  }
}

// ALERTS

const alerts = ref([])

const fetchAlerts = async () => {
  try {
    const { data } = await api.get('/api/v1/alerts/')
    alerts.value = data
  } catch (error) {
    console.error(error)
  }
}

provide('operationFunctions', {
  getData,
  applyFilters,
  resetFilters,
  transactions,
  filterParams,
})

provide('authorization', { login, logOut, loginRequest, closeLoginPanel })
provide('registration', { signupRequest, registerUser, showRegisterPanel, hideRegisterPanel })

provide('allCategories', { allCategories })

provide('years', { yearsInTransactions })
provide('months', { monthesInTransactions })

provide('transactionActions', {
  financialTransactionDTO,
  sendNewTransaction,
  updateTransaction,
  deleteTransaction,
})

provide('alerts', { alerts })

provide('typesOfTransactions', { typesOfTransactions })

provide('limits', { limits, fetchLimitsData })

onMounted(async () => {
  getData()
  fetchAllCategories()
  fetchLimitsData()
  fetchTrasactionTypes()
  fetchAlerts()
  fetchYears()
  fetchMonths()
  connectToAlertStream()
})

// onMounted(async () => {
//   await Promise.all([
//     fetchAllCategories(),
//     fetchLimitsData(),
//     fetchTrasactionTypes(),
//     fetchAlerts(),
//     fetchYears(),
//     fetchMonths(),
//     getData(),
//   ])

//   connectToAlertStream()
// })
//TODO: if login ok, every fetching function must be reloaded
watch(loginStatus, (newStatus) => {
  if (newStatus === 401) {
    showLoginPanel.value = true
  } else if (newStatus === 200) {
    showLoginPanel.value = false
    getData()
  }
})
</script>

<template>
  <main class="h-screen">
    <div class="flex justify-between h-screen">
      <LoginPanel v-if="showLoginPanel" />
      <RegisterPanel v-if="isShowRegistrationPanel" />
      <LeftPanel class="w-1/7" />
      <CenterPanel class="w-3/7 overflow-auto" />
      <LimitsPanel class="w-3/7" :limits="limits" :fetch-limits-data="fetchLimitsData" />
    </div>
  </main>
</template>
