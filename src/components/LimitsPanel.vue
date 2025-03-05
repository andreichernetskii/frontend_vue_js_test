<script setup>
import { inject, reactive, ref, onMounted } from 'vue'
import api from '@/axiosInstance'
import { format } from 'date-fns'

import HeaderLimitsPanel from './HeaderLimitsPanel.vue'
import LimitCard from './LimitCard.vue'

const { allCategories } = inject('allCategories')

const isShowLimitOperationWindow = ref(false)
const isEdit = ref(false)

const limits = ref([])

const limitTypes = ref([])

const limitDTO = reactive({
  limitType: '',
  limitAmount: '',
  category: '',
  creationDate: '',
})

const fetchLimitsData = async () => {
  try {
    const { data } = await api.get(`/api/v1/limits/`)

    limits.value = data.map((obj) => ({
      ...obj,
    }))
    console.log(limits.value)
  } catch (error) {
    console.log(error)
  }
}

const deleteLimit = async (id) => {
  try {
    await api.delete(`/api/v1/limits/${id}`)
    fetchLimitsData()
  } catch (error) {
    console.log(error)
  }
}

const setNewLimit = async () => {
  try {
    limitDTO.creationDate = format(new Date(), 'yyyy-MM-dd')

    const { data } = await api.post('/api/v1/limits/', limitDTO)
    fetchLimitsData()
    closeLimitOperationWindow()
  } catch (error) {
    console.log(error)
  }
}

const updateLimit = async (limitId, limit) => {
  try {
    limit.creationDate = format(new Date(), 'yyyy-MM-dd')
    console.log('Updated limit: ', limit.limitAmount)
    const { data } = await api.put(`/api/v1/limits/${limitId}`, limit)
    fetchLimitsData()
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

onMounted(async () => {
  fetchLimitsData()
  fetchLimitTypes()
})
</script>

<template>
  <div>
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
</template>
