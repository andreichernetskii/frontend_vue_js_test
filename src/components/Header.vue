<script setup>
import { inject, ref } from 'vue'

import TransactionOperationWindow from './TransactionOperationWindow.vue'

const { getData } = inject('operationFunctions')
const { logOut } = inject('authorization')
const { financialTransactionDTO, sendNewTransaction } = inject('transactionActions')
const { allCategories } = inject('allCategories')

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
      <button @click="logOut" class="btn">Sign-Out</button>
      <button @click="getData" class="btn">Gather data</button>
      <button @click="openTransactionOperationWindow" class="btn">New transaction</button>
    </div>
  </header>

  <div>
    <TransactionOperationWindow
      v-show="isShowTransactionOparationWindow"
      :close-window-func="closeTransactionOperationWindow"
      :financial-transaction-d-t-o="financialTransactionDTO"
      :submit-action="sendNewTransaction"
      :all-categories="allCategories"
      operation-name-title="Add new transaction"
    />
  </div>
</template>
