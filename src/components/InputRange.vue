<template>
  <div class="input-wrapper">
    <span :style="{ 'left': offset }">{{ current }}</span>
    <input
      type="range"
      :min="min"
      :max="max"
      v-model="current"
      @mouseup="emit('value', current)"
    />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
const props = defineProps({
  min: Number,
  max: Number,
  start: Number,
});

const emit = defineEmits(["value"]);
const current = ref(props.start);
const isClicked = ref(false);

/**
 *  Normalize <input type="range">
 *  val = (( x - min ) / ( max - min ))  // range from 0 to 1
 */
const offset = computed(() => {
  return  Math.round(((current.value - props.min) / (props.max - props.min)) * 100) + "%"
});
</script>

<style lang="scss" scoped>
$size: 50px;

.input-wrapper {
  position: relative;
  overflow: visible;
  margin: 30px;
  span {
    position: absolute;
    box-sizing: border-box;
    top: 0;
    width: $size;
    padding: 8px;
    text-align: center;
    display: block;
    transform: translateX(-$size/2) translateY(-16px);
    border: 2px solid #0075ff;
    border-radius: 6px;
    transition-duration: 200ms;
    transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  input[type="range"] {
    width: 350px;
    height: 10px;
    margin-top: 30px;
    cursor: pointer;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    background: #344553;
  }
}
</style>
