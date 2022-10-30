<template>
  <div class="page-bg">
    <div class="back"><RouterLink to="/">Back</RouterLink></div>
    <h1>Game settings</h1>

    <div class="page-container">
      <h3>General</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Fight time (sec)</h4>
          <InputRange
            :start="parseInt(store.getFightTime)"
            :min="0"
            :max="360"
            @value="(time) => store.setTime(time)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Game speed (fps)</h4>
          <InputRange
            :start="parseInt(store.getFramerate)"
            :min="1"
            :max="15"
            @value="(speed) => store.setFramerate(speed)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Pause mode</h4>
          <KeySelector
            :placeholder="store.getPauseKey"
            @update="(key) => store.setPauseKey(key)"
          />
        </div>
      </div>

      <h3>Player 1</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Name</h4>
          <InputText
            :placeholder="store.getPlayerName('player')"
            @update="(name) => store.setPlayerName('player', name)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Strenght</h4>
          <InputRange
            :start="store.getPlayerStrenght('player')"
            :min="1"
            :max="20"
            @value="(strenght) => store.setPlayerStrenght('player', strenght)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Health</h4>
          <InputRange
            :start="store.getPlayerHealth('player')"
            :min="1"
            :max="500"
            @value="(health) => store.setPlayerHealth('player', health)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Gravity</h4>
          <InputRange
            :start="store.getPlayerGravity('player') * 10"
            :min="1"
            :max="10"
            @value="(gravity) => store.setPlayerGravity('player', gravity / 10)"
          />
        </div>
      </div>

      <h3>Player 2</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Name</h4>
          <InputText
            :placeholder="store.getPlayerName('enemy')"
            @update="(name) => store.setPlayerName('enemy', name)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Strenght</h4>
          <InputRange
            :start="store.getPlayerStrenght('enemy')"
            :min="1"
            :max="20"
            @value="(strenght) => store.setPlayerStrenght('enemy', strenght)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Health</h4>
          <InputRange
            :start="store.getPlayerHealth('enemy')"
            :min="1"
            :max="500"
            @value="(health) => store.setPlayerHealth('enemt', health)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Gravity</h4>
          <InputRange
            :start="store.getPlayerGravity('enemy') * 10"
            :min="1"
            :max="10"
            @value="(gravity) => store.setPlayerGravity('enemy', gravity / 10)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { Store } from "@/stores/store";
import { RouterLink, RouterView } from "vue-router";
import InputRange from "../components/InputRange.vue";
import InputText from "../components/InputText.vue";
import Btn from "../components/Btn.vue";
import KeySelector from "../components/KeySelector.vue";
const store = Store();
</script>

<style lang="scss" scoped>
.page-bg {
  h1 {
    margin-top: 80px;
    text-align: center;
    width: 100%;
    display: inline-block;
  }
  .page-container {
    h3 {
      margin-top: 20px;
      text-align: center;
      width: 100%;
      display: inline-block;
    }

    .row {
      width: 100%;
      min-height: 120px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #222;
      border-radius: 12px;
      margin: 10px;
    }
  }
}
</style>
