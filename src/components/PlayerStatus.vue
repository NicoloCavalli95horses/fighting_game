<template>
  <div class="wrapper">
    <h3>Name: <span> {{ player.name }}</span> </h3>
    <h4>Health: <span> {{ player.health }} </span> </h4>
    <StatusBar :val="player.health" :max="store.game.settings.maxValues.health" class="bottom-12" />
    <h4>Strenght: <span> {{ player.strenght }} </span> </h4>
    <StatusBar :val="player.strenght" :max="store.game.settings.maxValues.strenght" class="bottom-12" />
    <h4>Speed: <span> {{ speed }} </span> </h4>
    <StatusBar :val="speed" :max="store.game.settings.maxValues.speed" />
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import StatusBar from '../components/StatusBar.vue'
import { Store } from "@/stores/store";
import { computed, onMounted } from '@vue/runtime-core';

// ==============================
// Props and emits
// ==============================
const props = defineProps({
  player: Object,
});

// ==============================
// Variables
// ==============================
const store = Store();

// Speed is inferred from the total amount of frames, for the attack aniamtion: less frames, more speed!
const speed = computed(() => store.game.settings.maxValues.speed - props.player.animation.attack.total);

</script>

<style lang="scss" scoped>
  .wrapper {
    margin: 22px;
    display: flex;
    flex-direction: column;

    h3 {
      margin: 12px 0;
      border-bottom: 2px solid rgba(255, 166, 0, 0.3);
      span {
        margin-left: 8px;
      }
    }

    h4 {
      font-size: 25px;
    }
  }
</style>
