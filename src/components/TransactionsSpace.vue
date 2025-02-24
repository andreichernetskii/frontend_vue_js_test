<script setup>
import Transaction from './Transaction.vue'
import { inject } from 'vue'

// defineProps({
//   transactions: Array,
// })

const { transactions } = inject('operationFunctions')
</script>

<template>
  <div>
    <Transaction
      v-for="transaction in transactions"
      :key="transaction.id"
      :financialTransactionType="transaction.financialTransactionType"
      :category="transaction.category"
      :date="transaction.date"
      :amount="transaction.amount"
    />
  </div>
</template>
