<template>
  <div v-if="store.game.settings.fightTime !== 'timeout'" class="clock-box flex-center">
    <h3 :class="{ 'infinite': infinite }">{{ store.game.settings.fightTime }}</h3>
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

// ==============================
// Functions
// ==============================
onMounted(() => {
  if (store.game.settings.fightTime !== -1) {
    setInterval(() => {
      if (store.game.settings.fightTime > 0 && !store.game.players.player.isDead && !store.game.players.enemy.isDead) {
        store.game.settings.fightTime--
      } else { 
        store.game.settings.fightTime = 'timeout';
        return
     }
    }, 1000);
  } else {
    store.game.settings.fightTime =  '∞';
    infinite.value = true;
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
  .infinite {
    color: orange;
    font-size: 65px;
  }
}
</style>
