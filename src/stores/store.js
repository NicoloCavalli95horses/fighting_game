import { defineStore } from "pinia";

export const Store = defineStore({
  id: "gameSettings",
  state: () => ({
    window: {
      width: 1080,
      height: 608,
    },
    game: {
      settings: {
        fightTime: -1,
        gameOver: false
      },
      players: {
        player: {
          name: "player 1",
          position: {
            x: 0,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          keys: {
            lastKey: null,
            left: "a",
            right: "d",
            up: "w",
            attack: "s",
          },
          width: 50,
          height: 150,
          lastKey: null,
          color: "blue",
          gravity: 0.7,
          isAttacking: false,
          health: 100,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 100,
            height: 50,
          },
        },
        enemy: {
          name: "player 2",
          position: {
            x: 1030,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          keys: {
            lastKey: null,
            left: "ArrowLeft",
            right: "ArrowRight",
            up: "ArrowUp",
            attack: "Insert",
          },
          width: 50,
          height: 150,
          lastKey: null,
          color: "red",
          gravity: 0.7,
          isAttacking: false,
          health: 100,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: -50,
            width: 100,
            height: 50,
          },
        },
      },
    },
  }),

  // getters: {
  // },

  // actions: {
  // },
});
