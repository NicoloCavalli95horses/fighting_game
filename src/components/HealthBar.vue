<template>
  <div class="relative"></div>
  <div class="wrapper">
    <div>
      <h2>{{ player.name }}</h2>
      <meter
        class="health"
        :min="0"
        :max="store.game.settings.maxValues.health"
        :low="30"
        :high="50"
        :optimum="70"
        :value="playerHealth"
      />
      <h4>{{ playerHealth }} HP </h4>
    </div>

    <Clock />

    <div>
      <h2>{{ enemy.name }}</h2>
      <meter
        class="health"
        :min="0"
        :max="store.game.settings.maxValues.health"
        :low="30"
        :high="50"
        :optimum="70"
        :value="enemyHealth"
      />
      <h4>{{ enemyHealth }} HP </h4>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import Clock from "./Clock.vue";
import { Store } from "@/stores/store";
import { ref, watch } from "@vue/runtime-core";

// ==============================
// Props and emits
// ==============================
const props = defineProps({
  player: Object,
  enemy: Object
})

const emits = defineEmits([ 'death' ])

// ==============================
// Variables
// ==============================
const store = Store();
const playerHealth = ref( props.player.health );
const enemyHealth = ref( props.enemy.health );

// ==============================
// Watchers
// ==============================
watch(
  () => props.player.health,
  ( health ) => {
    playerHealth.value = health;
    if ( playerHealth.value <= 0 ) {
      emits('death', 'player');
    }
  }
);

watch(
  () => props.enemy.health,
  ( health ) => {
    enemyHealth.value = health;
    if ( enemyHealth.value <= 0 ) {
      emits('death', 'enemy');
    }
  }
);

</script>

<style lang="scss" scoped>
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
  margin-top: 22px;

  div {
    width: 100%;
    margin: 12px;
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
      opacity: 70%;
      transform: translateY(-10px);
      font-size: 25px;
    }
    meter {
      width: 100%;
      height: 75px;
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
