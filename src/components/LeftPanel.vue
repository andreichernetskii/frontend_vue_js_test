<script setup>
import { inject } from 'vue'

const { filterParams, getData, resetFilters, applyFilters } = inject('operationFunctions')
</script>

<template>
  <!-- <form @submit.prevent="applyFilters"> -->
  <div class="flex flex-col left-0 top-0 gap-4 mt-2 right-4 px-2 h-screen">
    <!-- TODO: monthes and year like select and getted from transactions -->
    <select class="slct" v-model="filterParams.financialTransactionType">
      <option value="" selected>All types</option>
    </select>
    <select class="slct" v-model="filterParams.year">
      <option value="" selected>All years</option>
      <option value="2025">2025</option>
    </select>
    <select class="slct" v-model="filterParams.month">
      <option value="" selected>All monthes</option>
    </select>
    <select class="slct" v-model="filterParams.category">
      <option value="" selected>All categories</option>
    </select>
    <button class="btn" type="submit" @click="getData">Apply filters</button>
    <button class="btn" type="submit" @click="resetFilters">Reset filters</button>
  </div>
  <!-- </form> -->
</template>
