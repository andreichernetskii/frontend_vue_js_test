<script setup>
import { inject } from 'vue'

const { closeSendTransactionWindow } = inject('newTransactionWindowAction')
const { financialTransactionDTO, sendNewTransaction } = inject('newTransactionAction')

const handleSubmitButton = async () => {
  closeSendTransactionWindow()
  sendNewTransaction()
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <div class="flex justify-between gap-2">
        <select class="slct" v-model="financialTransactionDTO.financialTransactionType">
          <option value="" selected>Type</option>
          <option value="INCOME">INCOME</option>
          <option value="EXPENSE">EXPENSE</option>
        </select>
        <input
          class="inpt"
          type="number"
          placeholder="Amount"
          v-model="financialTransactionDTO.amount"
        />
        <select class="slct" v-model="financialTransactionDTO.category">
          <option selected value="">Category</option>
          <option value="Car">Car</option>
        </select>
        <input class="inpt" type="date" v-model="financialTransactionDTO.date" />
        <button class="btn" @click="handleSubmitButton">Submit</button>
      </div>
    </div>
  </div>
</template>
