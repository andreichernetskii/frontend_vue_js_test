<script setup>
defineProps({
  operationNameTitle: String,
  allCategories: Array,
  limitTypes: Array,
  limitDto: Object,
  submitAction: Function,
  closeWindowFunc: Function,
})

const handleSubmit = async () => {
  submitAction()
  closeWindowFunc()
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="relative bg-cards p-2 rounded-lg shadow-lg w-auto">
      <h2 class="text-center mb-2">{{ operationNameTitle }}</h2>
      <div class="flex justify-between gap-2">
        <select class="slct" v-model="limitDto.limitType" required>
          <option value="" selected disabled>Limit type</option>
          <option v-for="limitType in limitTypes" :key="limitType.id" :value="limitType">
            {{ limitType }}
          </option>
        </select>
        <input
          class="inpt"
          type="number"
          placeholder="Limit amount"
          v-model="limitDto.limitAmount"
          required
        />
        <select class="slct" v-model="limitDto.category">
          <option val="All" selected>All</option>
          <option v-for="category in allCategories" :key="category.id" :value="category">
            {{ category }}
          </option>
        </select>

        <button class="btn" @click="handleSubmit(submitAction, closeWindowFunc)">Submit</button>
        <button class="btn" @click="closeWindowFunc">Cancel</button>
      </div>
    </div>
  </div>
</template>
