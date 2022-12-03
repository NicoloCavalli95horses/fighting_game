<template>
  <div 
    v-for="n in totPlayers"
    :key="n"
    class="sel-box"
    :class="{ 
      'player-active' : playerSelection == n && playerSelection != enemySelection,
      'enemy-active' : enemySelection == n && playerSelection != enemySelection,
      'double-active' : n == playerSelection && playerSelection == enemySelection
      }"
    >
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { onMounted, onUnmounted, ref } from "@vue/runtime-core";

// ==============================
// Props
// ==============================

// ==============================
// Props
// ==============================
const totPlayers = 6;
const playerSelection = ref( 1 );
const enemySelection = ref( 1 );

// ==============================
// Functions
// ==============================
function onkeydown( e ) {

  if ( e.key == 'a' && playerSelection.value > 1 ) {
    playerSelection.value--;
  } else if ( e.key == 'd' && playerSelection.value < totPlayers ) {
    playerSelection.value++;
  }

  if ( e.key == 'ArrowLeft' && enemySelection.value > 1 ) {
    enemySelection.value--;
  } else if ( e.key == 'ArrowRight' && enemySelection.value < totPlayers ) {
    enemySelection.value++;
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
  background-image: url('https://picsum.photos/id/80/80');
  background-size: cover;
  background-repeat: no-repeat;

  &:hover {
    border: 4px solid white;
  }

  &.player-active {
    border: 4px solid orange;
  }
  &.enemy-active {
    border: 4px solid blue;
  }
  &.double-active {
    border: 4px solid orange;
    outline: 4px solid blue;
  }
}

// se muovo a-d seleziona active orange
// se muovo left-right seleziona active blue
</style>
