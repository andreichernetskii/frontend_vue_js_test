<script setup>
import { inject } from 'vue'

const { filterParams, getData, resetFilters, applyFilters } = inject('operationFunctions')
const { allCategories } = inject('allCategories')
const { typesOfTransactions } = inject('typesOfTransactions')
</script>

<template>
  <!-- <form @submit.prevent="applyFilters"> -->
  <div class="flex flex-col left-0 top-0 gap-4 mt-2 right-4 px-2 h-screen">
    <!-- TODO: monthes and year like select and getted from transactions -->
    <select class="slct" v-model="filterParams.financialTransactionType">
      <option value="" selected>All types</option>
      <option v-for="type in typesOfTransactions" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <select class="slct" v-model="filterParams.year">
      <option value="" selected>All years</option>
      <option value="2025">2025</option>
    </select>
    <select class="slct" v-model="filterParams.month">
      <option value="" selected>All monthes</option>
    </select>
    <select class="slct" v-model="filterParams.category">
      <option selected value="">All categories</option>
      <option v-for="category in allCategories" :key="category.id" :value="category">
        {{ category }}
      </option>
    </select>
    <button class="btn" type="submit" @click="getData">Apply filters</button>
    <button class="btn" type="submit" @click="resetFilters">Reset filters</button>
  </div>
  <!-- </form> -->
</template>
