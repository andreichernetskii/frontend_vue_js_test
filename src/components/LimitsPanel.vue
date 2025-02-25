<script setup>
import { inject } from 'vue'

import HeaderLimitsPanel from './HeaderLimitsPanel.vue'
import LimitCard from './LimitCard.vue'

const { limits } = inject('limits')
</script>

<template>
  <div>
    <HeaderLimitsPanel />
    <LimitCard
      v-for="limit in limits"
      :key="limit.id"
      :limitAmount="limit.limitAmount"
      :limitType="limit.limitType"
      :category="limit.category"
      :creationDate="limit.creationDate"
    />
  </div>
</template>
