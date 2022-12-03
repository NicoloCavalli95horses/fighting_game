<template>
  <div class="background">
    <section class="preview">
      <div class="left">
        <h1>Player 1</h1>
        <PlayerPreview src="src/assets/img/characters/samuraiMack/preview.png" />
        <PlayerStatus
          :title="store.getPlayerName('player')"
          :strenght="store.getPlayerStrenght('player')"
          :health="store.getPlayerHealth('player')"
        />
      </div>
      <div class="right">
        <h1>Player 2</h1>
        <PlayerPreview src="src/assets/img/characters/kenji/preview.png" />
        <PlayerStatus
          :title="store.getPlayerName('enemy')"
          :strenght="store.getPlayerStrenght('enemy')"
          :health="store.getPlayerHealth('enemy')"
        />
      </div>
    </section>

    <section class="players">
      <div class="players-box">
        <PlayerSelection />
      </div>
    </section>

    <RouterLink to="/game">
      <Btn @click="store.setTogglePause(false)" text="fight!" />
    </RouterLink>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { RouterLink, RouterView } from "vue-router";
import { Store } from "@/stores/store";
import Btn from "../components/Btn.vue";
import PlayerPreview from "../components/PlayerPreview.vue";
import PlayerStatus from "../components/PlayerStatus.vue";
import PlayerSelection from "../components/PlayerSelection.vue";

// ==============================
// Consts
// ==============================
const store = Store();
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  background-color: #111;

  section.preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 22px;
    box-sizing: border-box;
    height: 100%;
    .left,.right {
      width: 30%;
      border-radius: 12px;
    }
    .left {
      border: 4px solid rgba(255, 166, 0, 0.5);
    }

    .right {
      border: 4px solid rgba(0, 0, 255, 0.5);
    }

    h1 {
      text-align: center;
      font-size: 40px;
      padding: 10px 0;
    }
  }

  section.players {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    .players-box {
      width: 300px;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;

      .box {
        width: 80px;
        height: 80px;
        border: 2px solid white;
        border-radius: 12px;
      }
    }
  }

  button {
    position: absolute;
    bottom: 22px;
    transform: translateX(-50%);
    left: 50%;
  }
}
</style>
