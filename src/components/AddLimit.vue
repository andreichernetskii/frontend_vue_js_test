<script setup>
import { inject } from 'vue'
import { format } from 'date-fns'
import api from '@/axiosInstance'

const { closeAddLimitDialog } = inject('limits')

const limitDTO = {
  limitType: '',
  limitAmount: '',
  category: '',
  creationDate: '',
}

const setNewLimit = async () => {
  try {
    limitDTO.creationDate = format(new Date(), 'yyyy-MM-dd')

    const { data } = await api.post('/api/v1/limits/')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-50"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <div class="flex justify-between gap-2">
        <select class="slct" v-model="limitDTO.limitType">
          <option value="" selected>Limit type</option>
        </select>
        <input
          class="inpt"
          type="number"
          placeholder="Limit amount"
          v-model="limitDTO.limitAmount"
        />
        <select class="slct" v-model="limitDTO.category">
          <option selected value="">Category</option>
        </select>

        <button class="btn" @click="setNewLimit">Submit</button>
        <button class="btn" @click="closeAddLimitDialog">Cancel</button>
      </div>
    </div>
  </div>
</template>
