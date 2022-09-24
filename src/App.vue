<template>
  <nav>
    <RouterLink to="/"><h3>Home | </h3></RouterLink>
    <RouterLink to="/game"><h3>Game</h3></RouterLink>
  </nav>
  
  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style scoped lang="scss">
  nav {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 10;

    h3 {
      display: inline;
    }
  }
</style>
