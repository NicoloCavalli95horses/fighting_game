<template>
  <template v-if="!gameStart">
    <div class="background">
      <section class="preview">
        <div class="left">
          <h1>Player 1</h1>
          <PlayerPreview :img="players_preview[playerID - 1]" />
          <PlayerStatus :player="store.getPlayer(playerID)" />
        </div>
        <div class="right">
          <h1>Player 2</h1>
          <PlayerPreview :img="players_preview[enemyID - 1]" />
          <PlayerStatus :player="store.getPlayer(enemyID)" />
          />
        </div>
      </section>

      <section class="players">
        <div class="players-box">
          <PlayerSelection
            :imgs="players_boxes"
            :player="playerID"
            :enemy="enemyID"
            @keydown="(ids) => onPlayerChoose(ids)"
          />
        </div>
      </section>

      <Btn @click="onGameStart()" text="fight!" />
    </div>
  </template>

  <!-- Game -->
  <Game
    v-else
    :player="{ ...store.getPlayer( playerID ), keys : {...keys.player} }"
    :enemy="{ ...store.getPlayer( enemyID ), keys : { ...keys.enemy} }"
  >
  </Game>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { Store } from "@/stores/store";
import Btn from "../components/Btn.vue";
import PlayerPreview from "../components/PlayerPreview.vue";
import PlayerStatus from "../components/PlayerStatus.vue";
import PlayerSelection from "../components/PlayerSelection.vue";
import Game from "../views/Game.vue";
import { reactive, ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";

// ==============================
// Consts
// ==============================
const store = Store();
const players_boxes = [
  {
    id: 1,
    src: "src/assets/img/characters/samuraiMack/preview.png",
    zoom: "400%",
    position: "50% 75%",
  },
  {
    id: 2,
    src: "src/assets/img/characters/kenji/preview.png",
    zoom: "450%",
    position: "52% 74%",
  },
  {
    id: 3,
    src: "src/assets/img/characters/kunoichi/preview.png",
    zoom: "400%",
    position: "47% 64%",
  },
  {
    id: 4,
    src: "src/assets/img/characters/toriotoko/preview.png",
    zoom: "350%",
    position: "47% 39%",
  }
];

const players_preview = [
  {
    id: 1,
    src: "src/assets/img/characters/samuraiMack/preview.png",
    zoom: "130%",
    position: "50% 100%",
  },
  {
    id: 2,
    src: "src/assets/img/characters/kenji/preview.png",
    zoom: "130%",
    position: "50% 110%",
  },
  {
    id: 3,
    src: "src/assets/img/characters/kunoichi/preview.png",
    zoom: "100%",
    position: "50% 120%",
  },
  {
    id: 4,
    src: "src/assets/img/characters/toriotoko/preview.png",
    zoom: "75%",
    position: "50% 150%",
  }
];

const playerID = ref(1);
const enemyID = ref(2);
const gameStart = ref( false );
const keys = reactive({
  player : {
    left: "a",
      right: "d",
      up: "w",
      attack: "s"
  },
  enemy: {
      left: "ArrowLeft",
      right: "ArrowRight",
      up: "ArrowUp",
      attack: "ArrowDown",
    }
})

// ==============================
// Functions
// ==============================
function onPlayerChoose(ids) {
  playerID.value = ids.player;
  enemyID.value = ids.enemy;
}

function onGameStart() {
  store.setTogglePause( false );
  gameStart.value = true;
}
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
    .left, .right {
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
