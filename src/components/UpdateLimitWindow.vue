<script setup>
defineProps({
  limitTypes: Array,
  allCategories: Array,
  limit: Object,
  updateLimit: Function,
  closeLimitOperationWindow: Function,
})
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <form @submit.prevent="updateLimit">
        <div class="flex justify-between gap-2">
          <select class="slct" v-model="limit.limitType" required>
            <option value="" selected disabled>Limit type</option>
            <option v-for="limitType in limitTypes" :key="limitType.id" :value="limitType">
              {{ limitType }}
            </option>
          </select>
          <input
            class="inpt"
            type="number"
            placeholder="Limit amount"
            v-model="limit.limitAmount"
            required
          />
          <select class="slct" v-model="limit.category">
            <option val="All" selected>All</option>
            <option v-for="category in allCategories" :key="category.id" :value="category">
              {{ category }}
            </option>
          </select>

          <button class="btn">Submit</button>
          <button class="btn" @click="closeLimitOperationWindow">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>
