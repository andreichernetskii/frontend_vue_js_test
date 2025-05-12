<script setup>
import { ref, provide, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from './stores/auth'
import { useTransactionStore } from './stores/transactions'
import { useLimitStore } from './stores/limits'
import { useAlertStore } from './stores/alerts'
import { useFilterStore } from './stores/filters'
import { useSseStore } from './stores/sse'

import CenterPanel from './components/CenterPanel.vue'
import LeftPanel from './components/LeftPanel.vue'
import LimitsPanel from './components/LimitsPanel.vue'
import LoginPanel from './components/LoginPanel.vue'
import RegisterPanel from './components/RegisterPanel.vue'

const authStore = useAuthStore()
const transactionStore = useTransactionStore()
const limitStore = useLimitStore()
const filterStore = useFilterStore()
const alertStore = useAlertStore()
const sseStore = useSseStore()

const { showLoginPanel } = storeToRefs(authStore)
const { limits, isLoading: limitsLoading } = storeToRefs(limitStore)

const isSendNewTransactionWindowOpen = ref(false)

const openSendTransactionWindow = () => {
  isSendNewTransactionWindowOpen.value = true
}

const closeSendTransactionWindow = () => {
  isSendNewTransactionWindowOpen.value = false
}

const isShowRegistrationPanel = ref(false)

const showRegisterPanel = () => {
  isShowRegistrationPanel.value = true
}

const hideRegisterPanel = () => {
  isShowRegistrationPanel.value = false
}

const modalRef = ref(null)

const emailFocusRef = ref(null)

const handelOpenRegistrationEvent = async () => {
  showRegisterPanel()
  authStore.closeLoginPanel()
}

const handleClickOutside = (event) => {
  if (modalRef.value && !modalRef.value.contains(event.target)) {
    authStore.closeLoginPanel()
  }
}

const handleEscapeKeyDown = (event) => {
  if (event.key === 'Escape') {
    authStore.closeLoginPanel()
  }
}

const handleEnterKeyDown = (event) => {
  if (event.key === 'Enter') {
    authStore.login()
  }
}

onMounted(async () => {
  try {
    sseStore.connect()

    transactionStore.fetchTransactions()

    limitStore.fetchLimits()
    limitStore.fetchLimitTypes()

    alertStore.fetchAlerts()

    filterStore.fetchOptions()
  } catch (error) {
    console.log('Initial transaction fetch attempt finished (may have resulted in login prompt)')
  }

  // window.addEventListener('keydown', handleKeyDown)
  // document.addEventListener('mousedown', handleClickOutside)
})

onBeforeUnmount(() => {
  sseStore.disconnect()

  // window.removeEventListener('keydown', handleKeyDown)
  // document.removeEventListener('mousedown', handleClickOutside)
})

provide('registration', { showRegisterPanel, hideRegisterPanel })
</script>

<template>
  <main class="h-screen">
    <div class="flex justify-between h-screen">
      <LoginPanel v-if="showLoginPanel" />
      <RegisterPanel v-if="isShowRegistrationPanel" />
      <LeftPanel class="w-1/7" />
      <CenterPanel class="w-3/7 overflow-auto" />
      <LimitsPanel class="w-3/7" />
    </div>
  </main>
</template>
