<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useLimitStore } from '@/stores/limits'

import LimitOperationWindow from './LimitOperationWindow.vue'

const limitStore = useLimitStore()
const { limitDTO } = storeToRefs(limitStore)

const isShowAddLimitWindow = ref(false)

const openAddLimitWindow = () => {
  isShowAddLimitWindow.value = true
}

const closeAddLimitWindow = () => {
  isShowAddLimitWindow.value = false
}
</script>

<template>
  <div class="flex justify-center mt-2">
    <LimitOperationWindow
      v-if="isShowAddLimitWindow"
      operation-name-title="Set new limit"
      :limit-dto="limitDTO"
      :submit-action="() => limitStore.addLimit(limitDTO)"
      :close-window-func="closeAddLimitWindow"
    />
    <button class="btn" @click="openAddLimitWindow">Create new limit</button>
  </div>
</template>
