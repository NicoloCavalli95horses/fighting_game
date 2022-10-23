<template>
  <div class="background flex-column">
    <ul>
      <li @click="playGame"><RouterLink to="/game">Play</RouterLink></li>
      <!-- <li><RouterLink to="/online">Online mode</RouterLink></li> -->
      <li><RouterLink to="/settings">Game settings</RouterLink></li>
      <li><RouterLink to="/about">About</RouterLink></li>
    </ul>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { RouterLink, RouterView } from "vue-router";
import { Store } from "@/stores/store";

// ==============================
// Consts
// ==============================
const store = Store();

// ==============================
// Function
// ==============================
function playGame(){
  store.game.settings.pause = false;
}
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  background-color: #111;
  ul {
    text-align: center;
  }

  li {
    font-size: 28px;
    padding: 20px;
    &:not(:last-child) {
      border-bottom: 2px solid orangered;
    }
    &:hover {
      cursor: pointer;
      transition-duration: 600ms;
      filter: brightness(120%);
    }
  }
}
</style>
