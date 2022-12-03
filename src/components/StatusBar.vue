<template>
  <div class="box-wrapper">
    <template v-for="n in MAX" :key="n">
      <div class="box" :class="{ 'filled': (val * MAX) / max >= n }"></div>
    </template>
  </div>
</template>

<script setup>
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
