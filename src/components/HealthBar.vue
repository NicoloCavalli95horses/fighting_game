<template>
  <div class="meter-wrapper">
    <meter
      class="health"
      min="0"
      max="100"
      low="30"
      high="50"
      optimum="70"
      :value="store.player.health"
    />
    <meter
      class="health"
      min="0"
      max="100"
      low="30"
      high="50"
      optimum="70"
      :value="store.enemy.health"
    />
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { Store } from "@/stores/store";

// ==============================
// Variables
// ==============================
const store = Store();
</script>

<style lang="scss">
.meter-wrapper {
  position: absolute;
  width: 100%;
  display: flex;

  meter {
    width: 100%;
    height: 65px;
    margin: 10px;
  }
}
</style>
