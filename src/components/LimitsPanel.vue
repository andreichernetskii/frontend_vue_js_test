<script setup>
import { inject, reactive, ref, onMounted } from 'vue'
import { format } from 'date-fns'
import api from '@/axiosInstance'

import HeaderLimitsPanel from './HeaderLimitsPanel.vue'
import LimitCard from './LimitCard.vue'
import Alert from './Alert.vue'

defineProps({
  limits: Array,
  fetchLimitsData: Function,
})

const { allCategories } = inject('allCategories')
const { alerts } = inject('alerts')
// const { limits, fetchLimitsData } = inject('limits')

const isShowLimitOperationWindow = ref(false)
const isEdit = ref(false)

const limitTypes = ref([])

const limitDTO = reactive({
  limitType: '',
  limitAmount: '',
  category: '',
  creationDate: '',
})

const deleteLimit = async (id) => {
  try {
    await api.delete(`/api/v1/limits/${id}`)
    // TODO: here the SSE
    // fetchLimitsData()
  } catch (error) {
    console.log(error)
  }
}

const setNewLimit = async () => {
  try {
    limitDTO.creationDate = format(new Date(), 'yyyy-MM-dd')

    const { data } = await api.post('/api/v1/limits/', limitDTO)
    // TODO: here the SSE
    // fetchLimitsData()
    closeLimitOperationWindow()
  } catch (error) {
    console.log(error)
  }
}

const updateLimit = async (limitId, limit) => {
  try {
    limit.creationDate = format(new Date(), 'yyyy-MM-dd')
    console.log('Updated limit: ', limit.limitAmount)
    await api.put(`/api/v1/limits/${limitId}`, limit)
    // TODO: here the SSE

    // fetchLimitsData()
  } catch (error) {
    console.log(error)
  }
}

const fetchLimitTypes = async () => {
  try {
    const { data } = await api.get(`/api/v1/limits/types`)
    limitTypes.value = data.filter((limitType) => limitType !== 'ZERO')
    console.log(limitTypes.value)
  } catch (error) {
    console.log(error)
    loginStatus.value = error.status
    console.log(loginStatus.value)
  }
}

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

// defineExpose({ fetchLimitsData })

onMounted(async () => {
  // fetchLimitsData()
  fetchLimitTypes()
})
</script>

<template>
  <div>
    <div class="overflow-auto h-2/3">
      <HeaderLimitsPanel
        :limit-types="limitTypes"
        :all-categories="allCategories"
        :is-show-limit-operation-window="isShowLimitOperationWindow"
        :limit-d-t-o="limitDTO"
        :submit-function="setNewLimit"
      />
      <LimitCard
        v-for="limit in limits"
        :key="limit.id"
        :id="limit.id"
        :all-categories="allCategories"
        :category="limit.category"
        :limit-amount="limit.limitAmount"
        :limit-type="limit.limitType"
        :limit-types="limitTypes"
        :creation-date="limit.creationDate"
        :limit="limit"
        :delete-limit="() => deleteLimit(limit.id)"
        :update-limit="() => updateLimit(limit.id, limit)"
      />
    </div>
    <div class="h-1/3 overflow-auto mt-5">
      <Alert v-for="alert in alerts" :key="alert.id" :message="alert.message" />
    </div>
  </div>
</template>
