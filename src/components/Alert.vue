<script setup>
defineProps({
  message: String,
})
</script>

<template>
  <div
    class="m-auto border border-borders bg-cards mx-2 h-auto w-auto mt-2 rounded-md hover:shadow-md shadow-accent"
  >
    <div>{{ message }} alert</div>
  </div>
</template>
