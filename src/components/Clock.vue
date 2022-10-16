<template>
  <div class="clock-box">
    <template v-if="time >= 1">
      <h3>{{ time }}</h3>
    </template>
    <template v-else>
      <p>{{ time }}</p>
    </template>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted, watch } from "@vue/runtime-core";
import { Store } from "@/stores/store";

// ==============================
// Variables
// ==============================
const store = Store();
const time = ref( store.game.settings.fightTime );
let interval = null;

// ==============================
// Watcher
// ==============================
watch(
  () => store.game.settings.pause,
  () => {
    if ( store.game.settings.pause ) {
      clearInterval(interval);
    }
  }
);



// ==============================
// Life cycle
// ==============================
onMounted(() => {
  interval = setInterval(() => {
    if ( time.value > 1 ){
      time.value--;
    } else {
      time.value = 'timeout';
      store.game.settings.pause = true;
    }
  }, 1000)
});

onUnmounted(() => {
  time.value = store.game.settings.fightTime;
})
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
