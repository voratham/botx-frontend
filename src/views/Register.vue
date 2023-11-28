<script lang="ts">
export default {
  name: 'Register'
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import liff from '@line/liff';
const code = ref<string >('')
const errorCode = ref<string>('')

const handleSubmit =  () => {
if(code.value === '') {
    errorCode.value = 'Code is not empty'
    return
  }

  console.log('code.value ::', typeof code.value)
  if(code.value !== '123456') {
    errorCode.value = 'Code is incorrect'
    return
  }
  errorCode.value = ''
  code.value = ''
  confirm('OK is ready')
  liff.closeWindow()
}

</script>

<template>
  <section class="flex flex-col p-4">
    <h1 class="text-xl font-bold pb-2">Code from BotX</h1>
    <p class="text-[16px]">
      Please enter your code for registration.
    </p>
    <label for="code" class="text-base font-bold">
      Enter the 6-digit code
    </label>
    <div class="pb-2" />
    <input class="border rounded-md p-[11px] outline-none" type="text" name="code" placeholder="123456" v-model="code" inputmode="numeric" />
    <div v-if="errorCode !== null"  class="py-2 text-red-600 text-sm font-bold" >{{ errorCode }}</div>
    <div class="py-3" />
    <button class="bg-green-500 text-white rounded-md text-base font-bold py-3" @click="handleSubmit">
      Submit
    </button>
  </section>
</template>

<style scoped></style>
