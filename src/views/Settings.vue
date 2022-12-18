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
            label="pause"
            :placeholder="store.getPauseKey"
            @update="(key) => store.setPauseKey(key)"
          />
        </div>
      </div>

      <h3>Player 1</h3>
      <div class="flex-column">
        <div class="row">
          <div class="l-24 r-24">
            <KeySelector
              label="left"
              :placeholder="store.game.settings.keys.player.left"
              @update="(key) => store.game.settings.keys.player.left = key"
            />
            <KeySelector
              label="right"
              :placeholder="store.game.settings.keys.player.right"
              @update="(key) => store.game.settings.keys.player.right = key"
            />
          </div>
          <div class="l-24 r-24">
            <KeySelector
              label="jump"
              :placeholder="store.game.settings.keys.player.up"
              @update="(key) => store.game.settings.keys.player.up = key"
            />
            <KeySelector
              label="attack"
              :placeholder="store.game.settings.keys.player.attack"
              @update="(key) => store.game.settings.keys.player.attack = key"
            />
          </div>
        </div>
      </div>

      <h3>Player 2</h3>
      <div class="flex-column">
        <div class="row">
          <div class="l-24 r-24">
            <KeySelector
              label="left"
              :placeholder="store.game.settings.keys.enemy.left"
              @update="(key) => store.game.settings.keys.enemy.left = key"
            />
            <KeySelector
              label="right"
              :placeholder="store.game.settings.keys.enemy.right"
              @update="(key) => store.game.settings.keys.enemy.right = key"
            />
          </div>
          <div class="l-24 r-24">
            <KeySelector
              label="jump"
              :placeholder="store.game.settings.keys.enemy.up"
              @update="(key) => store.game.settings.keys.enemy.up = key"
            />
            <KeySelector
              label="attack"
              :placeholder="store.game.settings.keys.enemy.attack"
              @update="(key) => store.game.settings.keys.enemy.attack = key"
            />
          </div>
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
