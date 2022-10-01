<template>
  <nav>
    <RouterLink to="/"><h3>Menu</h3></RouterLink>
  </nav>
  
  <RouterView />
</template>

<script setup>
// ==============================
// Import
// ==============================
import { RouterLink, RouterView } from "vue-router";


// ==============================
// Variables
// ==============================

</script>

<style scoped lang="scss">
  nav {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 10;
    margin-top: 8px;
  }
</style>
