<template>
  <div class="settings-background">
    <h2>Settings</h2>
    <span class="r-12">Fight Time</span>
    <InputRange
      :current="store.game.settings.fightTime"
      :min="0"
      :max="300"
      @value="(val) => handleRangeValue(val)"
    />
    </div>
</template>

<script setup>
import { Store } from "@/stores/store";
import InputRange from "../components/InputRange.vue";
const store = Store();

function handleRangeValue(val) {
  store.game.settings.fightTime = val;
}
</script>

<style lang="scss" scoped>
.settings-background {
  width: 100%;
  height: 100vh;
  background-color: #111;
}
</style>
