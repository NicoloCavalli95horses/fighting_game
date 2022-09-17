<template>
  <div class="relative"></div>
  <div class="wrapper top-12">
    <meter
      class="health"
      min="0"
      max="100"
      low="30"
      high="50"
      optimum="70"
      :value="store.game.players.player.health"
    />
    <Clock :time="store.game.settings.fightTime" />
    <meter
      class="health"
      min="0"
      max="100"
      low="30"
      high="50"
      optimum="70"
      :value="store.game.players.enemy.health"
    />
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import Clock from "./Clock.vue";
import { Store } from "@/stores/store";
import { watch } from "@vue/runtime-core";

// ==============================
// Emits
// ==============================
const emit = defineEmits(["gameOver"]);

// ==============================
// Variables
// ==============================
const store = Store();

// ==============================
// Watcher
// ==============================
watch(
  () => store.game.players.player.health,
  () => {
    if (store.game.players.player.health == 0) {
      store.game.players.player.isDead = true;
      console.log("Player 1 died");
    }
  }
);

watch(
  () => store.game.players.enemy.health,
  () => {
    if (store.game.players.enemy.health == 0) {
      store.game.players.enemy.isDead = true;
      console.log("Player 2 died");
    }
  }
);
</script>

<style lang="scss">
.relative {
  position: relative;
}
.wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  meter {
    width: 100%;
    height: 65px;
    margin: 10px;
  }
}
</style>
