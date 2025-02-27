<script setup>
import { ref } from 'vue'

import UpdateLimitWindow from './UpdateLimitWindow.vue'

defineProps({
  id: Number,
  allCategories: Array,
  category: String,
  limitAmount: Number,
  limitType: String,
  limitTypes: Array,
  creationDate: String,
  limit: Object,
  deleteLimit: Function,
  updateLimit: Function,
})

const isEdit = ref(false)

const openLimitOperationWindow = () => {
  isEdit.value = true
}

const closeLimitOperationWindow = () => {
  isEdit.value = false
}
</script>

<template>
  <div
    class="m-auto border border-borders bg-cards mx-2 h-auto w-auto mt-2 rounded-md hover:shadow-md shadow-accent"
  >
    <div class="grid grid-cols-5 text-text place-items-center">
      <span>{{ limitAmount }}</span>
      <span>{{ limitType }}</span>
      <span>{{ category !== '' ? category : 'All' }}</span>
      <span>{{ creationDate }}</span>
      <div class="flex justify-between">
        <img
          @click="openLimitOperationWindow"
          class="w-7 border rounded-sm border-borders cursor-pointer m-1"
          src="/edit-icon.png"
          alt="Edit"
        />
        <img
          @click="deleteLimit"
          class="w-7 border rounded-sm border-borders cursor-pointer m-1"
          src="/trash-icon.png"
          alt="Edit"
        />
      </div>
    </div>
  </div>
  <UpdateLimitWindow
    v-if="isEdit"
    :key="id"
    :limit-types="limitTypes"
    :all-categories="allCategories"
    :limit="limit"
    :submit-function="updateLimit"
    :close-limit-operation-window="closeLimitOperationWindow"
  />
</template>
