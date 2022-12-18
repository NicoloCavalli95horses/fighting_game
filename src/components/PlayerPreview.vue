<template>
  <div class="preview-wrapper"
  :style="{ 
   'background-image' : 'url('+ img.src +')',
    'background-position' : img.position,
    'background-size' : img.zoom
  }"
  >
  </div>
</template>

<script setup>
// ==============================
// Props
// ==============================
const props = defineProps({
  img: Object,
});
</script>

<style lang="scss" scoped>
.preview-wrapper {
    height: 250px;
    border: 2px solid #222;
    border-radius: 12px;
    margin: 22px;
    background-repeat: no-repeat;
}
</style>