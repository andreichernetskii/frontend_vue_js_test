<script setup>
import { ref } from 'vue'

import TransactionOperationWindow from './TransactionOperationWindow.vue'

const props = defineProps({
  id: Number,
  financialTransactionType: String,
  financialTransactionDTO: Object,
  category: String,
  date: String,
  amount: Number,
  editFunc: Function,
  deleteTransactionFunc: Function,
  allCategories: Array,
})

const isEdit = ref(false)

const openEditWindow = () => {
  isEdit.value = true
}

const closeEditWindow = () => {
  isEdit.value = false
}
</script>

<template>
  <div
    class="m-auto border border-borders bg-cards mx-2 h-10 mt-2 rounded-md hover:shadow-md shadow-accent"
  >
    <div class="grid grid-cols-4 flex justify-between text-text place-items-center">
      <span>{{ props.category }}</span>
      <span>{{ props.date }}</span>
      <span :class="props.financialTransactionType === 'INCOME' ? 'text-income' : 'text-expense'">{{
        props.amount
      }}</span>
      <div class="flex justify-between">
        <img
          @click="openEditWindow"
          class="w-7 border rounded-sm border-borders cursor-pointer m-1"
          src="/edit-icon.png"
          alt="Edit"
        />
        <img
          @click="deleteTransactionFunc"
          class="w-7 border rounded-sm border-borders cursor-pointer m-1"
          src="/trash-icon.png"
          alt="Edit"
        />
      </div>
    </div>
    <TransactionOperationWindow
      v-show="isEdit"
      operation-name-title="Edit transaction"
      :all-categories="allCategories"
      :close-window-func="closeEditWindow"
      :submit-action="editFunc"
      :financial-transaction-d-t-o="financialTransactionDTO"
    />
  </div>
</template>
