<script setup>
import { ref, provide, watch, reactive, onMounted } from 'vue'
import api from './axiosInstance'

import CenterPanel from './components/CenterPanel.vue'
import LeftPanel from './components/LeftPanel.vue'
import LimitsPanel from './components/LimitsPanel.vue'
import LoginPanel from './components/LoginPanel.vue'

const transactions = ref([]) // list of all transactions from back

const yearsInTransactions = ref([]) // years for filling <select> elements in filters
const monthesInTransactions = ref([]) // monthes for filling <select> elements in filters
const allCategories = ref([]) // transaction types for <select> in filters
const typesOfTransactions = ref([]) // transaction types for <select> in filters

const showLoginPanel = ref(false)

const loginStatus = ref(null)

const isSendNewTransactionWindowOpen = ref(false)

const childRef = ref(null)

const fetchAllCategories = async () => {
  try {
    const { data } = await api.get('/api/v1/transactions/categories')
    allCategories.value = data
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
  }
}

const loginRequest = reactive({
  email: '',
  password: '',
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
    // TODO: here the SSE
    getData()
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
    console.log(loginStatus.value)
  }
}

const deleteTransaction = async (id) => {
  try {
    await api.delete(`/api/v1/transactions/${id}`)
    // TODO: here the SSE
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

const alerts = ref([])
const connectionStatus = ref(null)
let eventSource = null

// connect to SSE on server
const connectToAlertStream = () => {
  // close connection if exist
  if (eventSource) {
    eventSource.close()
  }

  // new SSE connection
  eventSource = new EventSource('http://localhost:8080/api/v1/alerts/stream', {
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
      alerts.value = JSON.parse(event.data)
      console.log(alerts)
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
    // connectToAlertStream()
  }

  // trying recconect after a while
  // setTimeout(() => {
  //   eventSource.close()
  //   connectToAlertStream()
  // }, 5000)
}

provide('operationFunctions', {
  getData,
  applyFilters,
  resetFilters,
  transactions,
  filterParams,
})

provide('authorization', { login, logOut, loginRequest, closeLoginPanel })

provide('allCategories', { allCategories })

provide('transactionActions', {
  financialTransactionDTO,
  sendNewTransaction,
  updateTransaction,
  deleteTransaction,
})

provide('alerts', { alerts })

onMounted(async () => {
  getData()
  fetchAllCategories()
  connectToAlertStream()
})

watch(loginStatus, (newStatus) => {
  if (newStatus === 401) {
    showLoginPanel.value = true
  } else if (newStatus === 200) {
    showLoginPanel.value = false
    getData()
    childRef.value?.fetchLimitsData()
    // TODO here the why limits are not fetching
  }
})
</script>

<template>
  <main class="h-screen">
    <div class="flex justify-between h-screen">
      <LoginPanel v-if="showLoginPanel" />
      <LeftPanel class="w-1/7" />
      <CenterPanel class="w-3/7 overflow-auto" />
      <LimitsPanel class="w-3/7" ref="childRef" />
    </div>
  </main>
</template>
