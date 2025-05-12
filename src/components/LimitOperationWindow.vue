<script setup>
import { storeToRefs } from 'pinia'

import { useLimitStore } from '@/stores/limits'
import { useFilterStore } from '@/stores/filters'

const props = defineProps({
  operationNameTitle: String,
  limitDto: Object,
  submitAction: Function,
  closeWindowFunc: Function,
})

const limitStore = useLimitStore()
const filterStore = useFilterStore()

const { limitTypes } = storeToRefs(limitStore)
const { allCategories } = storeToRefs(filterStore)

const handleSubmit = async () => {
  props.submitAction()
  props.closeWindowFunc()
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="relative bg-cards p-2 rounded-lg shadow-lg w-auto">
      <h2 class="text-center mb-2">{{ props.operationNameTitle }}</h2>
      <div class="flex justify-between gap-2">
        <select class="slct" v-model="props.limitDto.limitType" required>
          <option value="" selected disabled>Limit type</option>
          <option v-for="limitType in limitTypes" :key="limitType" :value="limitType">
            {{ limitType }}
          </option>
        </select>
        <input
          class="inpt"
          type="number"
          placeholder="Limit amount"
          v-model="props.limitDto.limitAmount"
          required
        />
        <select class="slct" v-model="props.limitDto.category">
          <option value="" selected>All categories</option>
          <option v-for="category in allCategories" :key="category.id" :value="category">
            {{ category }}
          </option>
        </select>

        <button class="btn" @click="handleSubmit">Submit</button>
        <button class="btn" @click="props.closeWindowFunc">Cancel</button>
      </div>
    </div>
  </div>
</template>
