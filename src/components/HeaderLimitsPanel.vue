<script setup>
import { inject } from 'vue'

import NewLimitWindow from './NewLimitWindow.vue'

// defineProps({
//   limitTypes: Array,
//   allCategories: Array,
//   isShowLimitOperationWindow: Boolean,
//   limitDTO: Object,
//   submitFunction: Function,
//   closeLimitOperationWindow: Function,
//   openLimitOperationWindow: Function,
// })

const { allCategories } = inject('allCategories')
const {
  limitDTO,
  limitTypes,
  isShowLimitOperationWindow,
  setNewLimit,
  closeLimitOperationWindow,
  openLimitOperationWindow,
} = inject('dataForNew')
</script>

<template>
  <div class="flex justify-center mt-2">
    <NewLimitWindow
      v-if="isShowLimitOperationWindow"
      :limit-types="limitTypes"
      :all-categories="allCategories"
      :limit-d-t-o="limitDTO"
      :submit-function="setNewLimit"
      :close-limit-operation-window="closeLimitOperationWindow"
    />
    <button class="btn" @click="openLimitOperationWindow">Create new limit</button>
  </div>
</template>
