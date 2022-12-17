<template>
  <div class="wrapper">
    <h3>Name: <span> {{ player.name }}</span> </h3>
    <h3>Health: <span> {{ player.health }} </span></h3>
    <StatusBar :val="player.health" :max="store.game.settings.maxValues.health" />
    <h3>Strenght: <span> {{ player.strenght }} </span></h3>
    <StatusBar :val="player.strenght" :max="store.game.settings.maxValues.strenght" />
  </div>
</template>

<script setup>
import StatusBar from '../components/StatusBar.vue'
import { Store } from "@/stores/store";
import { onMounted } from '@vue/runtime-core';

const store = Store();

const props = defineProps({
  player: Object,
});

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
  }
</style>
