<template>
  <div v-if="timer !== 'timeout'" class="clock-box flex-center">
    <h3 :class="{ 'infinite': infinite }">{{ timer }}</h3>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { Store } from "@/stores/store";

// ==============================
// Props
// ==============================
const props = defineProps({
  time: Number,
});

// ==============================
// Variables
// ==============================
const store = Store();
const timer = ref(store.game.settings.fightTime);
const infinite = ref(false);

// ==============================
// Functions
// ==============================
onMounted(() => {
  if (timer.value !== -1) {
    setInterval(() => {
      if (timer.value > 0) {
         timer.value--
      } else { 
        store.game.settings.fightTime = 'timeout';
        return
     }
    }, 1000);
  } else {
    timer.value =  '∞';
    infinite.value = true;
  }
});
</script>

<style lang="scss" scoped>
.clock-box {
  width: 200px;
  height: 100px;
  border-radius: 20%;
  background-color: unset;
  h3 {
    font-size: 38px;
  }

  .infinite {
    color: orange;
    font-size: 65px;
  }
}
</style>
