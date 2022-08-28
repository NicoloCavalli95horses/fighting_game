import { defineStore } from "pinia";

export const Store = defineStore({
  id: "gameSettings",
  state: () => ({
    player: {
      health: 100,
    },
    enemy: {
      health: 100,
    },
  }),
  // getters: {
  // },
  actions: {
    decreaseLife(user) {
      if (user == "player") {
        this.player.health -= 10;
      } else if (user == "enemy") {
        this.enemy.health -= 10;
      }
    },
  },
});
