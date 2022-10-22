<template>
  <nav>
    <RouterLink to="/"><h3 @click="pauseGame">Menu</h3></RouterLink>
  </nav>
  <RouterView />
</template>

<script setup>
// ==============================
// Import
// ==============================
import { Store } from "@/stores/store";
import { RouterLink, RouterView } from "vue-router";

// ==============================
// Consts
// ==============================
const store = Store();

// ==============================
// Function
// ==============================
function pauseGame(){
  store.game.settings.pause = true;
}

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
