<script setup>
import { inject } from 'vue'

const { loginRequest, login, closeLoginPanel } = inject('authorization')
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-75"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <div class="flex justify-between">
        <h2>Provide the authorization data</h2>
        <button class="btn" @click="closeLoginPanel">x</button>
      </div>
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
        <button class="btn" @click="login" type="submit">Sighn In</button>
      </div>
    </div>
  </div>
</template>
