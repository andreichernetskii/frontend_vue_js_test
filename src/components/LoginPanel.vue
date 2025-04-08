<script setup>
import { inject } from 'vue'

const { loginRequest, login, closeLoginPanel } = inject('authorization')
const { showRegisterPanel } = inject('registration')

const handelOpenRegistrationEvent = async () => {
  showRegisterPanel()
  closeLoginPanel()
}
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
        <button class="btn" @click="login" type="submit">Sign In</button>
        <button class="btn" @click="handelOpenRegistrationEvent" type="submit">Sign Up</button>
        <button class="btn" @click="closeLoginPanel" type="submit">Cancel</button>
      </div>
    </div>
  </div>
</template>
