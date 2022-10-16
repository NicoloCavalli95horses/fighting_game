<template>
  <div class="input-wrapper">
    <input type="range" :min="min" :max="max" @mouseup="emit('value', current)" v-model="current" />
    <div class="value-wrapper" :style="{ 'left': offset }">
      <div class="cursor"></div>
      <div class="value">
        <span>{{ current }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { computed, ref } from "vue";

// ==============================
// Props, emits, variables
// ==============================
const props = defineProps({
  min: Number,
  max: Number,
  start: Number,
});

const emit = defineEmits(["value"]);
const current = ref(props.start);
const isClicked = ref(false);

// ==============================
// Functions
// ==============================

/**
 *  Normalize <input type="range">
 *  val = (( x - min ) / ( max - min ))  // range from 0 to 1
 */
const offset = computed(() => {
  return Math.round(((current.value - props.min) / (props.max - props.min)) * 100) + "%"
});
</script>

<style lang="scss" scoped>
$spanSize: 50px;
$spanBorder: 2px;
$arrowSize: 8px;
$blue: #0075ff;
$orange: rgba(225, 142, 0);
$t-duration: 200ms;

.input-wrapper {
  position: relative;
  overflow: visible;
  margin: 30px 50px;

  input[type="range"] {
    cursor: pointer;
    min-width: 300px;
    height: 15px;
    margin-top: 30px;
    appearance: none;
    background: #444;
    border-radius: 10px;
    z-index: 2;

    &::-webkit-slider-thumb {
      appearance: none;
      width: 48px;
      height: 48px;
      cursor: pointer;
      z-index: 2;
      position: relative;
    }
  }

  .value-wrapper {
    width: 48px;
    height: 80px;
    position: absolute;
    bottom: -20px;
    transform: translateX(-50%);
    overflow: visible;

    .cursor {
      width: 20px;
      height: 20px;
      background-color: orange;
      position: absolute;
      border-radius: 50%;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, -100%);
      transition-duration: $t-duration;
      z-index: 0;
    }

    .value {
      text-align: center;
      overflow: visible;
      span {
        border: 2px solid $orange;
        border-radius: 5px;
        padding: 6px;
      }

      &::after {
        content: "";
        position: absolute;
        top: 25px;
        left: 50%;
        margin: 0 auto;
        transform: translate(-50%, 0);
        border-left: $arrowSize solid transparent;
        border-right: $arrowSize solid transparent;
        border-top: $arrowSize solid $orange;
      }
    }
  }
}
</style>
