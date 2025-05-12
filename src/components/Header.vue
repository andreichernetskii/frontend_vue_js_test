<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useTransactionStore } from '@/stores/transactions'
import { useAuthStore } from '@/stores/auth'
import { useFilterStore } from '@/stores/filters'

import TransactionOperationWindow from './TransactionOperationWindow.vue'

const transactionStore = useTransactionStore()
const { financialTransactionDTO } = storeToRefs(transactionStore)

const authStore = useAuthStore()

const filterStore = useFilterStore()
const { allCategories } = storeToRefs(filterStore)

const isShowTransactionOparationWindow = ref(false)

const openTransactionOperationWindow = () => {
  isShowTransactionOparationWindow.value = true
}

const closeTransactionOperationWindow = () => {
  isShowTransactionOparationWindow.value = false
}
</script>

<template>
  <header>
    <div class="flex justify-center gap-2 mt-2 right-4 px-2">
      <button @click="authStore.logOut" class="btn">Sign-Out</button>
      <button @click="openTransactionOperationWindow" class="btn">New transaction</button>
    </div>
  </header>

  <div>
    <TransactionOperationWindow
      v-if="isShowTransactionOparationWindow"
      :close-window-func="closeTransactionOperationWindow"
      :financial-transaction-d-t-o="financialTransactionDTO"
      :submit-action="() => transactionStore.addTransaction(financialTransactionDTO)"
      :all-categories="allCategories"
      operation-name-title="Add new transaction"
    />
  </div>
</template>
