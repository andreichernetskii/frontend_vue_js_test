<script setup>
import { ref, provide, watch, reactive, onMounted, onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from './stores/auth'
import { useTransactionStore } from './transactions'
import { useLimitStore } from './limits'
import { useAlertStore } from './alerts'
import { useFilterStore } from './filters'
import { useSseStore } from './sse'

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

const { showLoginPanel, loginRequest } = storeToRefs(authStore)
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

onMounted(async () => {
  try {
    await transactionStore.fetchTrasactions()
  } catch (error) {
    console.log('Initial transaction fetch attempt finished (may have resulted in login prompt)')
  }
})

onBeforeUnmount(() => {
  sseStore.disconnect()
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
