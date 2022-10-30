<template>
  <div class="relative"></div>
  <div class="wrapper">
    <div>
      <h2>{{ store.getPlayerName('player') }}</h2>
      <meter
        class="health"
        :min="0"
        :max="100"
        :low="30"
        :high="50"
        :optimum="70"
        :value="store.getPlayerHealth('player')"
      />
      <h4>{{ store.getPlayerHealth('player') }}%</h4>
    </div>

    <Clock />

    <div>
      <h2>{{ store.getPlayerName('enemy') }}</h2>
      <meter
        class="health"
        :min="0"
        :max="100"
        :low="30"
        :high="50"
        :optimum="70"
        :value="store.getPlayerHealth('enemy')"
      />
      <h4>{{ store.getPlayerHealth('enemy') }}%</h4>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import Clock from "./Clock.vue";
import { Store } from "@/stores/store";
import { watch } from "@vue/runtime-core";

// ==============================
// Variables
// ==============================
const store = Store();

// ==============================
// Watcher
// ==============================
watch(
  () => store.getPlayerHealth('player'),
  ( health ) => {
    if ( health <= 0 ) {
      store.setWinner('enemy');
    }
  }
);

watch(
  () => store.getPlayerHealth('enemy'),
  ( health ) => {
    if ( health <= 0 ) {
      store.setWinner('player');
    }
  }
);
</script>

<style lang="scss">
$transition-duration: 500ms;
$transition-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1.275);
$background: rgba(0, 0, 0, 0.1);
$optimum: #2ecc71;
$sub-optimum: #f39c12;
$sub-sub-optimum: #e74c3c;

.relative {
  position: relative;
}
.wrapper {
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 32px;

  div {
    width: 100%;
    margin: 12px;
    background-color: rgba(0, 0, 0, 0.1);
    padding: 18px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 40px;
    }
    h4 {
      text-align: center;
      letter-spacing: 5px;
      opacity: 50%;
      transform: translateY(-52px);
      font-size: 25px;
    }
    meter {
      width: 100%;
      height: 75px;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }

    meter::-webkit-meter-bar {
      background: $background;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-timing-function;
    }

    meter::-webkit-meter-optimum-value {
      background: $optimum;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-timing-function;
    }

    meter::-webkit-meter-suboptimum-value {
      background: $sub-optimum;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-timing-function;
    }

    meter::-webkit-meter-even-less-good-value {
      background: $sub-sub-optimum;
      transition-duration: $transition-duration;
      transition-timing-function: $transition-timing-function;
    }
  }
}
</style>
