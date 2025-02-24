<script setup>
// defineProps({
//   login: Function,
//   getData: Function,
// })
// const emit = defineEmits(['login', 'getData'])

import { inject } from 'vue'

const { login, getData, logOut } = inject('operationFunctions')
const { openSendTransactionWindow } = inject('newTransactionWindowAction')
</script>

<template>
  <header>
    <div class="flex gap-2 mt-2 right-4 px-2">
      <input class="inpt" type="text" placeholder="login" />
      <input class="inpt" type="text" placeholder="password" />
      <button @click="login" class="btn">Sign-In</button>
      <button @click="logOut" class="btn">Sign-Out</button>
      <button @click="getData" class="btn">Gather data</button>
      <button @click="openSendTransactionWindow" class="btn">New transaction</button>
    </div>
  </header>

  <div></div>
</template>
