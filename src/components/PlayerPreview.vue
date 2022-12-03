<template>
  <div class="player-img" :style="{ 'background-image' : 'url('+ src +')' }"></div>
</template>

<script setup>
// ==============================
// Props
// ==============================
const props = defineProps({
  src: String,
});
</script>

<style lang="scss" scoped>
.player-img {
    height: 300px;
    border: 2px solid #222;
    border-radius: 12px;
    margin: 22px;
    background-size: 150%;
    background-position: 50%;
}
</style>