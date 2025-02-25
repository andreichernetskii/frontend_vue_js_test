<script setup>
defineProps({
  category: String,
  limitAmount: Number,
  limitType: String,
  creationDate: String,
})
</script>

<template>
  <div
    class="m-auto border border-borders bg-cards w-5/6 h-10 mt-2 rounded-md hover:shadow-md shadow-accent"
  >
    <div class="grid grid-cols-4 text-text px-3 py-2 place-items-center">
      <span>{{ limitAmount }}</span>
      <span>{{ limitType }}</span>
      <span>{{ category !== '' ? category : 'All' }}</span>
      <span>{{ creationDate }}</span>
    </div>
  </div>
</template>
