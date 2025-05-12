<script setup>
import { storeToRefs } from 'pinia'

import { useTransactionStore } from '@/stores/transactions'
import { useFilterStore } from '@/stores/filters'

const transactionStore = useTransactionStore()
const filterStore = useFilterStore()

const { params, allCategories, typesOfTransactions, monthsInTransactions, yearsInTransactions } =
  storeToRefs(filterStore)
</script>

<template>
  <div class="flex flex-col left-0 top-0 gap-4 mt-2 right-4 px-2 h-screen">
    <select class="slct" v-model="params.financialTransactionType">
      <option value="" selected>All types</option>
      <option v-for="type in typesOfTransactions" :key="type" :value="type">
        {{ type }}
      </option>
    </select>
    <select class="slct" v-model="params.year">
      <option value="" selected>All years</option>
      <option v-for="year in yearsInTransactions" :key="year.id" :value="year">
        {{ year }}
      </option>
    </select>
    <select class="slct" v-model="params.month">
      <option value="" selected>All monthes</option>
      <option v-for="month in monthsInTransactions" :key="month.id" :value="month">
        {{ month }}
      </option>
    </select>
    <select class="slct" v-model="params.category">
      <option selected value="">All categories</option>
      <option v-for="category in allCategories" :key="category.id" :value="category">
        {{ category }}
      </option>
    </select>
    <button class="btn" type="submit" @click="transactionStore.fetchTransactions">
      Apply filters
    </button>
    <button class="btn" type="submit" @click="filterStore.resetFilters">Reset filters</button>
  </div>
  <!-- </form> -->
</template>
