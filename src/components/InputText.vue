<template>
  <input
    type="text"
    :placeholder="placeholder"
    v-model="value"
    @blur="$emit('update', value)"
  />
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
</script>

<style lang="scss" scoped>
  input[type="text"]{
    width: 250px;
    height: 30px;
    border-radius: 12px;
    padding: 0 12px;
    outline: none;
    border: none;
    margin: 30px;
    caret-color: orange;
    font-size: 18px;

    &::placeholder {
      filter: grayscale(60%);
      opacity: 0.3;
    }

    &:focus {
      border-bottom: 5px solid orange;
    }
  }
</style>
