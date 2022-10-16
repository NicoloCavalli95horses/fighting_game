<template>
  <div v-if="winner || timeout" class="absolute">
    <div class="flex-column">
      <h1 v-if="winner">{{ winner }} win!</h1>
      <h1 v-else-if="timeout || !winner ">Tie</h1> 
      <div class="top-12 flex-center">
        <Btn text="Play again" class="r-12" @click="playAgain()" />
        <RouterLink to="/">
          <Btn text="Menu" />
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import Btn from "../components/Btn.vue";
import { Store } from "@/stores/store";
import { computed, ref, watch } from "@vue/runtime-core";
import { RouterLink, RouterView } from "vue-router";

// ==============================
// Variables
// ==============================
const store = Store();
const winner = ref( false );
const timeout = ref( false );


// ==============================
// Functions
// ==============================
function playAgain(){
  store.$reset()
  winner.value = false;
  timeout.value = false;
}
// ==============================
// Watcher
// ==============================
watch(
  () => store.game.settings.winner,
  () => {
    if ( store.game.settings.winner ) {
      winner.value = store.game.settings.winner
    }
  }
);

watch(
  () => store.game.settings.pause,
  () => {
    if ( store.game.settings.pause ) {
      timeout.value = store.game.settings.pause
    }
  }
);
</script>

<style lang="scss">
.absolute {
  z-index: 20;
  position: absolute;
  width: 100%;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.6);
  h1 {
    font-size: 50px;
  }
}
</style>
