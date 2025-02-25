<script setup>
import { inject } from 'vue'

const { getData } = inject('operationFunctions')
const { openSendTransactionWindow } = inject('newTransactionWindowAction')
const { logOut } = inject('authorization')
</script>

<template>
  <header>
    <div class="flex justify-center gap-2 mt-2 right-4 px-2">
      <button @click="logOut" class="btn">Sign-Out</button>
      <button @click="getData" class="btn">Gather data</button>
      <button @click="openSendTransactionWindow" class="btn">New transaction</button>
    </div>
  </header>

  <div></div>
</template>
