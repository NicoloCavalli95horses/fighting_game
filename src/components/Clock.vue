<template>
  <div v-if="store.game.settings.fightTime !== 'timeout'" class="clock-box flex-center">
    <h3>{{ store.game.settings.fightTime }}</h3>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { Store } from "@/stores/store";

// ==============================
// Variables
// ==============================
const store = Store();
const infinite = ref(false);
let timer = null;

// ==============================
// Functions
// ==============================
onMounted(() => {
  if (store.game.settings.fightTime !== -1 || !store.game.settings.pause ) {
    timer = setInterval(() => {
      if (store.game.settings.fightTime > 0 && !store.game.players.player.isDead && !store.game.players.enemy.isDead) {
        store.game.settings.fightTime--
      } else { 
        store.game.settings.fightTime = 'timeout';
        return
     }
    }, 1000);
  } else {
    clearInterval( timer );
  }
});
</script>

<style lang="scss" scoped>
.clock-box {
  width: 200px;
  height: 100px;
  border-radius: 20%;
  background-color: unset;
  h3 {
    font-size: 38px;
  }
}
</style>
