<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useLimitStore } from '@/stores/limits'
import { useFilterStore } from '@/stores/filters'
import { useAlertStore } from '@/stores/alerts'

import HeaderLimitsPanel from './HeaderLimitsPanel.vue'
import LimitCard from './LimitCard.vue'
import Alert from './Alert.vue'

const limitStore = useLimitStore()
const alertStore = useAlertStore()

const { limits } = storeToRefs(limitStore)
const { alerts } = storeToRefs(alertStore)

const isShowLimitOperationWindow = ref(false)
const isEdit = ref(false)

const openLimitOperationWindow = () => {
  isShowLimitOperationWindow.value = true
}

const closeLimitOperationWindow = () => {
  isShowLimitOperationWindow.value = false
}

const openEditWindow = () => {
  isEdit.value = true
}

const closeEditWindow = () => {
  isEdit.value = false
}
</script>

<template>
  <div>
    <div class="overflow-auto h-2/3">
      <HeaderLimitsPanel />
      <LimitCard
        v-for="limit in limits"
        :key="limit.id"
        :id="limit.id"
        :category="limit.category"
        :limit-amount="limit.limitAmount"
        :limit-type="limit.limitType"
        :creation-date="limit.creationDate"
        :limit="limit"
        :delete-limit="() => limitStore.deleteLimit(limit.id)"
        :update-limit="() => limitStore.updateLimit(limit)"
      />
    </div>
    <div class="h-1/3 overflow-auto mt-5">
      <Alert v-for="alert in alerts" :key="alert.id" :message="alert.message" />
    </div>
  </div>
</template>
