<template>
  <div
    v-for="img in imgs"
    :key="img.id"
    class="sel-box"
    :class="{
      'player-active': playerSelection == img.id && playerSelection != enemySelection,
      'enemy-active': enemySelection == img.id && playerSelection != enemySelection,
      'double-active': img.id == playerSelection && playerSelection == enemySelection,
    }"
    :style="{
      'background-image': 'url(' + img.src + ')',
      'background-position': img.position,
      'background-size': img.zoom,
    }"
  ></div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";

// ==============================
// Props and emits
// ==============================
const props = defineProps({
  imgs: Object,
  player: Number,
  enemy: Number,
});

const emit = defineEmits(["keydown"]);

// ==============================
// Consts
// ==============================
const playerSelection = ref(props.player);
const enemySelection = ref(props.enemy);

// ==============================
// Functions
// ==============================
function onkeydown(e) {
  if (e.key == "a" && playerSelection.value > 1) {
    playerSelection.value--;
    emit("keydown", {
      player: playerSelection.value,
      enemy: enemySelection.value,
    });
  } else if (e.key == "d" && playerSelection.value < props.imgs.length) {
    playerSelection.value++;
    emit("keydown", {
      player: playerSelection.value,
      enemy: enemySelection.value,
    });
  }

  if (e.key == "ArrowLeft" && enemySelection.value > 1) {
    enemySelection.value--;
    emit("keydown", {
      player: playerSelection.value,
      enemy: enemySelection.value,
    });
  } else if (
    e.key == "ArrowRight" &&
    enemySelection.value < props.imgs.length
  ) {
    enemySelection.value++;
    emit("keydown", {
      player: playerSelection.value,
      enemy: enemySelection.value,
    });
  }
}

// ==============================
// Life cycle
// ==============================
onMounted(() => {
  document.addEventListener("keydown", onkeydown);
});

onUnmounted(() => {
  document.removeEventListener("keydown", onkeydown);
});
</script>

<style lang="scss" scoped>
.sel-box {
  width: 80px;
  height: 80px;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  box-sizing: border-box;
  background-repeat: no-repeat;

  &.player-active {
    border: 4px solid var(--orange);
  }
  &.enemy-active {
    border: 4px solid var(--blue);
  }
  &.double-active {
    border: 4px solid var(--orange);
    outline: 4px solid var(--blue);
  }
}
</style>
