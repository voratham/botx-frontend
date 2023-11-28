<script setup lang="ts">
import { onBeforeMount, ref } from "vue"
import { liff } from "@line/liff"
import { useRoute } from "vue-router";

const profile = ref<{
  userId: string;
    displayName: string;
    pictureUrl?: string;
    statusMessage?: string;
} | undefined>(undefined);

const route = useRoute()

onBeforeMount( async () => {
  await liff.init({ liffId: "2001520615-Gxa6gRaD"})
  liff.ready.then(async () => {
    const profileResp = await liff.getProfile()
    profile.value = profileResp

  })
})
</script>

<template>  
    <div v-if="profile && !route.fullPath.match(/history-message/)" class="profile flex flex-row px-4 py-2 items-center">
      <img :src="profile?.pictureUrl" alt="avatar"  class="rounded-full w-[50px] h-[50px]"/>
      <p class="text-base font-bold">{{profile?.displayName}}</p>
    </div>
    <section class="p-4">
      <router-view/>
    </section>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
