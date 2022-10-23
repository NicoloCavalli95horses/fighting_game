<template>
  <div class="flex-center m-22">
    <p>Press any key</p>
    <input
      type="text"
      :placeholder="placeholder"
      v-model="value"
      @blur="$emit('update', value)"
      @keyup="handleKeyup"
    />
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { ref } from "@vue/reactivity";

// ==============================
// Props
// ==============================
const props = defineProps({
  placeholder: String,
});

const emits = defineEmits(["update"]);

// ==============================
// Variables
// ==============================
const value = ref("");


// ==============================
// Functions
// ==============================
function handleKeyup( e ) {
  console.log(e.key)
  value.value = e.key
}
</script>

<style lang="scss" scoped>
$size: 50px;

input[type="text"] {
  box-sizing: border-box;
  margin: 20px;
  max-width: calc( $size * 2);
  height: $size;
  border-radius: 12px;
  outline: none;
  text-align: center;

  &::placeholder {
    filter: grayscale(60%);
    opacity: 0.3;
  }

  &:focus {
    border-bottom: 5px solid orange;
  }
}
</style>
