<script setup lang="ts">
import { useRoute } from "vue-router";
const route =  useRoute()

</script>

<template>  
    <h1>BotXMain</h1>
    router : {{ route.fullPath }}
    <br/>
    <router-link to="/register">Go to register</router-link>
    <br/>
    <router-link to="/setup-admin">Go to setup-admin</router-link>
    <br/>
    <router-link to="/manage-tag">Go to manage-tag</router-link>
    <br/>
    <router-link to="/summary-message">Go to summary-message</router-link>
    <br/>
    <hr/>
    <router-view />
    <hr>
    <p>footer here</p>
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
