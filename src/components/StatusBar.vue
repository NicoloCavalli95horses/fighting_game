<template>
  <div class="box-wrapper">
    <template v-for="n in MAX" :key="n">
      <div class="box" :class="{ 'filled': ((val * MAX) / max >= n) && timeCount >= n }"></div>
    </template>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onMounted, onUnmounted, ref, watch } from "@vue/runtime-core";


// ==============================
// Props
// ==============================
const props = defineProps({
  val: Number,
  max: Number,
});

// ==============================
// Consts
// ==============================
const MAX = 20;
const timeCount = ref( 0 );
let interval = null;

// ==============================
// Watchers
// ==============================
watch( timeCount, ( time ) => {
  if ( time >= 50 ) {
    clearInterval( interval );
  }
})

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  interval = setInterval( () => {
    timeCount.value++;
  }, 100)
})

onUnmounted(() => {
  clearInterval( interval );
})
</script>

<style lang="scss" scoped>
.box-wrapper {
  display: flex;
  gap: 4px;
  padding: 8px 0;
  .box {
    width: 100%;
    height: 10px;
    border: 2px solid orange;

    &.filled {
      background-color: orange;
    }
  }
}

</style>
