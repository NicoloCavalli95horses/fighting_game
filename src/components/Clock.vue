<template>
  <div class="clock-box flex-center">
    <h3>{{ timer }}</h3>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================

import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

// ==============================
// Props
// ==============================
const props = defineProps({
  time: Number,
});

const timer = ref(props.time);

// ==============================
// Functions
// ==============================
onMounted(() => {
  if (timer.value !== -1) {
    setInterval(() => {
      timer.value--;
    }, 1000);
  } else {
    timer.value =  '∞';
  }
});
</script>

<style lang="scss" scoped>
.clock-box {
  width: 200px;
  height: 100px;
  border-radius: 20%;
  background-color: plum;
}
</style>
