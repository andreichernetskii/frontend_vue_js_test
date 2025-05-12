<script setup>
import { storeToRefs } from 'pinia'

import { useFilterStore } from '@/stores/filters'

const props = defineProps({
  closeWindowFunc: Function,
  submitAction: Function,
  financialTransactionDTO: Object,
  allCategories: Array,
  operationNameTitle: String,
})

const filterStore = useFilterStore()
const { typesOfTransactions } = storeToRefs(filterStore)

const handleSubmitButton = async () => {
  props.submitAction()
  props.closeWindowFunc()
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <h2 class="text-center mb-2">{{ props.operationNameTitle }}</h2>
      <div class="flex justify-between gap-2">
        <select
          class="slct"
          v-model="props.financialTransactionDTO.financialTransactionType"
          required
        >
          <option value="" selected>Type</option>
          <option v-for="type in typesOfTransactions" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
        <input
          class="inpt"
          type="number"
          placeholder="Amount"
          v-model="props.financialTransactionDTO.amount"
          required
        />
        <select class="slct" v-model="props.financialTransactionDTO.category">
          <option selected value="">Category</option>
          <option v-for="category in props.allCategories" :key="category.id" :value="category">
            {{ category }}
          </option>
        </select>
        <input class="inpt" type="date" v-model="props.financialTransactionDTO.date" />

        <button class="btn" @click="handleSubmitButton">Submit</button>
        <button class="btn" @click="props.closeWindowFunc">Cancel</button>
      </div>
    </div>
  </div>
</template>
