<template>
  <nav>
    <RouterLink to="/">Home | </RouterLink>
    <RouterLink to="/game">Game</RouterLink>
  </nav>
  
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="scss">
  nav {
    position: absolute;
  }
</style>
