<template>
  <div class="clock-box">
    <template v-if="store.game.settings.fightTime !== 'timeout'">
      <h3>{{ store.game.settings.fightTime }}</h3>
    </template>
    <template v-else>
      <p>{{ store.game.settings.fightTime }}</p>
    </template>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { Store } from "@/stores/store";

// ==============================
// Variables
// ==============================
const store = Store();
let interval = null;

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  interval = setInterval(() => {
    if (!store.game.settings.pause && !store.game.settings.winner) {
      if (store.game.settings.fightTime > 1) {
        store.game.settings.fightTime--;
      } else {
        store.game.settings.fightTime = "timeout";
      }
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style lang="scss" scoped>
.clock-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  height: 100px;
  border-radius: 20%;
  background-color: unset;
  h3 {
    font-size: 38px;
  }

  p {
    font-size: 22px;
  }
}
</style>
