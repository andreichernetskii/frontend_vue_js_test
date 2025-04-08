<script setup>
import { inject } from 'vue'

const { signupRequest, registerUser, hideRegisterPanel } = inject('registration')
</script>

<template>
  <div class="fixed inset-0 flex items-center justify-center">
    <div class="absolute inset-0 bg-black opacity-75"></div>
    <div class="relative bg-cards p-4 rounded-lg shadow-lg w-auto">
      <p class="text-center mb-2">
        Enter your email, create a password, and press 'Sign Up' to register like a new user.
      </p>

      <div class="mb-2 grid gap-2">
        <div class="flex gap-2">
          <label for="email_input">Login:</label>
          <input
            class="inpt"
            type="email"
            id="email_input"
            name="username"
            placeholder="Email"
            v-model="signupRequest.email"
            required
          />
        </div>

        <div class="flex gap-2">
          <label for="password_input">Password:</label>
          <input
            class="inpt"
            type="password"
            id="password_input"
            name="password"
            placeholder="Password"
            v-model="signupRequest.password"
            required
          />
        </div>
      </div>

      <div class="mb-2">
        <input type="checkbox" id="demo_checkbox" name="demo" v-model="signupRequest.demo" />
        <label for="demo_checkbox">
          Demo user (after creating the demo user, the database will automatically fill the
          financial transactions table for showcase purposes)
        </label>
      </div>

      <div class="flex justify-end gap-2">
        <button class="btn" type="submit" @click="registerUser">Submit</button>
        <button class="btn" type="submit" @click="hideRegisterPanel">Cancel</button>
      </div>
    </div>
  </div>
</template>
