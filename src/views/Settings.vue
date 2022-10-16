<template>
  <div class="settings">
    <h1>Game settings</h1>

    <div class="settings-container">
      <h3>General</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Fight time (sec)</h4>
          <InputRange
            :start="store.game.settings.fightTime"
            :min="0"
            :max="360"
            @value="(val) => (store.game.settings.fightTime = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Game speed (fps)</h4>
          <InputRange
            :start="store.game.settings.frameRate"
            :min="1"
            :max="15"
            @value="(val) => (store.game.settings.frameRate = val)"
          />
        </div>
      </div>

      <h3>Player 1</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Name</h4>
          <InputText
            :placeholder="store.game.players.player.name"
            @update="(val) => (store.game.players.player.name = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Strenght</h4>
          <InputRange
            :start="store.game.players.player.strenght"
            :min="1"
            :max="20"
            @value="(val) => (store.game.players.player.strenght = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Health</h4>
          <InputRange
            :start="store.game.players.player.health"
            :min="1"
            :max="500"
            @value="(val) => (store.game.players.player.health = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Gravity</h4>
          <InputRange
            :start="store.game.players.player.gravity * 10"
            :min="1"
            :max="10"
            @value="(val) => (store.game.players.player.gravity = val / 10)"
          />
        </div>
      </div>

      <h3>Player 2</h3>
      <div class="flex-column">
        <div class="row">
          <h4 class="l-24">Name</h4>
          <InputText
            :placeholder="store.game.players.enemy.name"
            @update="(val) => (store.game.players.enemy.name = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Strenght</h4>
          <InputRange
            :start="store.game.players.enemy.strenght"
            :min="1"
            :max="20"
            @value="(val) => (store.game.players.enemy.strenght = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Health</h4>
          <InputRange
            :start="store.game.players.enemy.health"
            :min="1"
            :max="500"
            @value="(val) => (store.game.players.enemy.health = val)"
          />
        </div>

        <div class="row">
          <h4 class="l-24">Gravity</h4>
          <InputRange
            :start="store.game.players.enemy.gravity * 10"
            :min="1"
            :max="10"
            @value="(val) => (store.game.players.enemy.gravity = val / 10)"
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
import InputRange from "../components/InputRange.vue";
import InputText from "../components/InputText.vue";
const store = Store();

</script>

<style lang="scss" scoped>
.settings {
  width: 100%;
  height: 100vh;
  background-color: #111;

  h1 {
    margin-top: 80px;
    text-align: center;
    width: 100%;
    display: inline-block;
  }
  .settings-container {
    max-height: 550px;
    max-width: 700px;
    margin: 50px auto;
    overflow: auto;
    padding: 20px;

    &::-webkit-scrollbar {
      display: none;
    }

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
