<template>
  <div class="clock-box">
    <template v-if="store.getFightTime !== 'timeout'">
      <h3>{{ store.getFightTime }}</h3>
    </template>
    <template v-else>
      <p>{{ store.getFightTime }}</p>
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
    if (!store.getPauseMode && !store.getWinner) {
      if (store.getFightTime > 1) {
        store.setTime(1);
      } else {
        store.setTime("timeout");
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
