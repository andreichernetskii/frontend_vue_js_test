<script setup>
import { inject } from 'vue'

const { loginRequest, sighnInFunc, closeLoginPanel } = inject('loginFunctions')
</script>

<template>
  <div class="login-container">
    <h2>Sighn In</h2>

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
    <button class="btn" @click="sighnInFunc" type="submit">Sighn In</button>
  </div>
</template>
