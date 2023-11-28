<script lang="ts">
export default {
  name: 'CreateTag'
};
</script>

<script setup lang="ts">
import {  ref } from 'vue';
import { createTag } from '@/api/botx';
import { getGroupIdFromRoute } from "../utils/getGroupIdFromRoute"
import { useRoute } from 'vue-router';
import router from '@/router';

const tag = ref<string | null>(null)
const errorTag = ref<string | null>(null)
const loading = ref<boolean>(false)

const route = useRoute()
const getGroupIdQuery = route.query["groupId"]

const onSubmit = async () => {
  if (tag.value === null || tag.value === '') {
    errorTag.value ="@Tag is required"
    return;
  }

  if ( tag.value.length <= 3) {
    errorTag.value ="@Tag is too short"
  }

  errorTag.value = null
  try {
    loading.value = true
    const groupId = getGroupIdFromRoute(getGroupIdQuery)
    console.log('submit groupId ::', groupId)
    if (groupId){
      await createTag(groupId, `@${tag.value.trim()}`)
      console.log('created tag success')
      router.go(-1)
    }
  } catch (error) {
    console.error('error ::', error)
    alert('Something went wrong, please try again')
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <section class="flex flex-col p-4">
    <h1 class="text-xl font-bold pb-2">Create New "@{{ tag || "Your Tag" }}"</h1>
    <p class="text-[16px]">
      Please enter tag name (without '@')
    </p>
    <div class="pb-2" />
    <form class="flex flex-col">
      <input class="border rounded-md p-[11px] outline-none" type="text" name="tag" v-model="tag" placeholder="Tag"  />
      <div v-if="errorTag !== null"  class="py-2 text-red-600 text-sm font-bold" >{{ errorTag }}</div>
      <div class="py-3" />
      <button
        v-if="!loading"
        type="button" @click="onSubmit" class="bg-green-500 text-white rounded-md text-base font-bold py-3">
        Submit
      </button>
      <button
        v-if="loading"
        type="button"  class="bg-gray-400 text-white rounded-md text-base font-bold py-3">
        Loading...
      </button>
    </form>
  </section>
</template>

<style scoped>
</style>
