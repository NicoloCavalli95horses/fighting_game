<template>
  <div class="clock-box">
    <template v-if="isNaN(time)">
      <p> {{ time }} </p>
    </template>
    <template v-else>
      <h3> {{ time }} </h3>
    </template>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";
import { Store } from "@/stores/store";

// ==============================
// Variables
// ==============================
const store = Store();
let interval = null;
const time = ref( null );

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  time.value = store.getFightTime;
  
  interval = setInterval(() => {
    if (!store.getPauseMode && !store.getWinner) {
      if (time.value > 1) {
        time.value --;
      } else {
        store.setTime("timeout");
        time.value = store.getFightTime;
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
  max-width: 100px;
  height: 100px;
  border-radius: 20%;
  background-color: transparent !important;
  h3 {
    font-size: 38px;
  }

  p {
    font-size: 22px;
  }
}
</style>
