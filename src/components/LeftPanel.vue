<script setup>
import { inject } from 'vue'

const { filterParams, getData, resetFilters, applyFilters } = inject('operationFunctions')
const { allCategories } = inject('allCategories')
const { typesOfTransactions } = inject('typesOfTransactions')
const { monthesInTransactions } = inject('months')
const { yearsInTransactions } = inject('years')
</script>

<template>
  <!-- <form @submit.prevent="applyFilters"> -->
  <div class="flex flex-col left-0 top-0 gap-4 mt-2 right-4 px-2 h-screen">
    <select class="slct" v-model="filterParams.financialTransactionType">
      <option value="" selected>All types</option>
      <option v-for="type in typesOfTransactions" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <select class="slct" v-model="filterParams.year">
      <option value="" selected>All years</option>
      <option v-for="year in yearsInTransactions" :key="year.id" :value="year">
        {{ year }}
      </option>
    </select>
    <select class="slct" v-model="filterParams.month">
      <option value="" selected>All monthes</option>
      <option v-for="month in monthesInTransactions" :key="month.id" :value="month">
        {{ month }}
      </option>
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
