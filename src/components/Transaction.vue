<script setup>
defineProps({
  financialTransactionType: String,
  category: String,
  date: String,
  amount: Number,
})
</script>

<template>
  <div
    class="m-auto border border-borders bg-cards mx-2 h-10 mt-2 rounded-md hover:shadow-md shadow-accent"
  >
    <div class="grid grid-cols-4 flex justify-between text-text place-items-center">
      <span>{{ category }}</span>
      <span>{{ date }}</span>
      <span :class="financialTransactionType === 'INCOME' ? 'text-income' : 'text-expense'">{{
        amount
      }}</span>
    </div>
  </div>
</template>
