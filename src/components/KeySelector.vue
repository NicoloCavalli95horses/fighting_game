<template>
  <div class="flex-center m-22">
    <p> {{ label }} </p>
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
  label: String,
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
  value.value = e.key
}
</script>

<style lang="scss" scoped>

input[type="text"] {
  box-sizing: border-box;
  width: 120px;
  height: 40px;
  padding: 6px 8px;
  border-radius: 24px;
  border: none;
  text-align: center;
  margin-left: 10px;

  &::placeholder {
    filter: hue-rotate(180deg);
  }

  &:focus {
    border-bottom: 5px solid orange;
  }
}
</style>
