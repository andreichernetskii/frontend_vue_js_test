<script setup>
import { inject, ref } from 'vue'
import { storeToRefs } from 'pinia'

import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const { loginRequest } = storeToRefs(authStore)

const { showRegisterPanel } = inject('registration')

// onMounted(() => {
//   window.addEventListener('keydown', handleKeyDown)
//   document.addEventListener('mousedown', handleClickOutside)

//   if (emailFocusRef.value) {
//     emailFocusRef.value.focus()
//   }
// })

// onBeforeUnmount(() => {
//   window.removeEventListener('keydown', handleKeyDown)
//   document.removeEventListener('mousedown', handleClickOutside)
// })
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-75"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <h2 class="text-center mb-2">Provide the authorization data</h2>
      <div class="flex justify-between gap-2">
        <input
          class="inpt"
          v-model="loginRequest.email"
          type="text"
          name="username"
          placeholder="Email"
          required
        />
        <input
          class="inpt"
          v-model="loginRequest.password"
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button class="btn" @click="authStore.login" type="submit">Sign In</button>
        <button class="btn" @click="handelOpenRegistrationEvent" type="submit">Sign Up</button>
        <button class="btn" @click="authStore.closeLoginPanel" type="submit">Cancel</button>
      </div>
    </div>
  </div>
</template>
