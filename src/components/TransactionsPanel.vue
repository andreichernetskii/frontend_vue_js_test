<script setup>
import { storeToRefs } from 'pinia'

import { useFilterStore } from '@/stores/filters'
import { useTransactionStore } from '@/stores/transactions'

import Transaction from './Transaction.vue'

const transactionStore = useTransactionStore()
const filterStore = useFilterStore()

const { allCategories } = storeToRefs(filterStore)
const { transactions, financialTransactionDTO } = storeToRefs(transactionStore)
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
      :deleteTransactionFunc="() => transactionStore.deleteTransaction(transaction.id)"
      :editFunc="() => transactionStore.updateTransaction(transaction)"
      :allCategories="allCategories"
    />
  </div>
</template>
