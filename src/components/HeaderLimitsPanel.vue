<script setup>
import { inject, ref } from 'vue'

import LimitOperationWindow from './LimitOperationWindow.vue'

defineProps({
  limitTypes: Array,
  allCategories: Array,
  isShowLimitOperationWindow: Boolean,
  limitDTO: Object,
  submitFunction: Function,
})

const isShowAddLimitWindow = ref(false)

const openAddLimitWindow = () => {
  isShowAddLimitWindow.value = true
}

const closeAddLimitWindow = () => {
  isShowAddLimitWindow.value = false
}

const { allCategories } = inject('allCategories')
</script>

<template>
  <div class="flex justify-center mt-2">
    <LimitOperationWindow
      v-show="isShowAddLimitWindow"
      operation-name-title="Set new limit"
      :all-categories="allCategories"
      :limit-types="limitTypes"
      :limit-dto="limitDTO"
      :submit-action="submitFunction"
      :close-window-func="closeAddLimitWindow"
    />
    <button class="btn" @click="openAddLimitWindow">Create new limit</button>
  </div>
</template>
