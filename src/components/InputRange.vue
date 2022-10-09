<template>
  <div class="flex-column">
    <div class="tip"><p :style="{ 'transform' : ` translateX( ${ offset }px )`}">{{ current }}</p></div>
    <input 
      type="range"
      :min="min"
      :max="max"
      v-model="current"
      @mousedown="isClicked = true"
      @mouseup="isClicked = false; emit('value', current)"
      @mousemove="e => handleMouseMove(e)"/>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  min: Number,
  max: Number,
  current: Number,
});

const emit = defineEmits([
  'value'
])

const offset = ref( null );
const isClicked = ref(false);

function handleMouseMove(e){
  if ( isClicked.value && e.offsetX > 0 && e.offsetX < 100 ) {
    offset.value = e.offsetX;
  }
}
</script>

<style lang="scss" scoped>

  .tip {
    width: 100%;

    div {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      padding: 8px;
      text-align: center;
    }
  }
  input[type="range"] {
    margin: 10px 0;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    background: #344553;
  }

</style>
