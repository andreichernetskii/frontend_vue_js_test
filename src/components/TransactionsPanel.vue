<script setup>
import { inject, ref } from 'vue'

import Transaction from './Transaction.vue'

const { transactions } = inject('operationFunctions')
const { financialTransactionDTO, updateTransaction, deleteTransaction } =
  inject('transactionActions')

const { allCategories } = inject('allCategories')
</script>

<template>
  <div>
    <Transaction
      v-for="transaction in transactions"
      :key="transaction.id"
      :id="transaction.id"
      :financialTransactionType="transaction.financialTransactionType"
      :category="transaction.category"
      :date="transaction.date"
      :amount="transaction.amount"
      :financialTransactionDTO="transaction"
      :deleteTransactionFunc="() => deleteTransaction(transaction.id)"
      :editFunc="() => updateTransaction(transaction)"
      :allCategories="allCategories"
    />
  </div>
</template>
