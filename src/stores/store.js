import { defineStore } from "pinia";

export const Store = defineStore({
  id: "gameSettings",
  state: () => ({
    game: {
      settings: {
        fightTime: 60,
        frameRate: 10,
        pause: false,
        winner: "",
        keys: {
          pause: "p",
        },
        maxValues: {
          health: 200,
          strenght: 10,
        }
      },
      players: {
        player: {
          name: "Samurai Mack",
          position: {
            x: 50,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          keys: {
            left: "a",
            right: "d",
            up: "w",
            attack: "s",
          },
          lastKey: null,
          width: 50,
          height: 150,
          gravity: 0.6,
          state: "idle",
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 100,
          strenght: 8,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          animation: {
            idle: {
              src: "src/assets/img/characters/samuraiMack/Idle",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            jump: {
              src: "src/assets/img/characters/samuraiMack/Jump",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            fall: {
              src: "src/assets/img/characters/samuraiMack/Fall",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              src: "src/assets/img/characters/samuraiMack/Attack1",
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            run: {
              src: "src/assets/img/characters/samuraiMack/Run",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              src: "src/assets/img/characters/samuraiMack/Death",
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            hit: {
              src: "src/assets/img/characters/samuraiMack/Hit",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
          },
        },
        enemy: {
          name: "Kenji",
          position: {
            x: window.innerWidth - 100,
            y: 0,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          keys: {
            left: "ArrowLeft",
            right: "ArrowRight",
            up: "ArrowUp",
            attack: "ArrowDown",
          },
          lastKey: null,
          width: 50,
          height: 150,
          gravity: 0.4,
          state: "idle",
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 180,
          strenght: 5,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          animation: {
            idle: {
              src: "src/assets/img/characters/kenji/Idle",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            jump: {
              src: "src/assets/img/characters/kenji/Jump",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              src: "src/assets/img/characters/kenji/Attack1",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            fall: {
              src: "src/assets/img/characters/kenji/Fall",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            run: {
              src: "src/assets/img/characters/kenji/Run",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              src: "src/assets/img/characters/kenji/Death",
              width: 1400,
              height: 200,
              total: 7,
              i: 1,
            },
            hit: {
              src: "src/assets/img/characters/kenji/Hit",
              width: 600,
              height: 200,
              total: 3,
              i: 1,
            },
          },
        },
      },
    },
  }),
  getters: {
    getPlayer(){
      return this.game.players.player
    },
    getEnemy(){
      return this.game.players.enemy
    },
    getPlayerName() {
      return (name) => {
        if (name === "player") {
          return this.game.players.player.name;
        } else if (name === "enemy") {
          return this.game.players.enemy.name;
        }
      };
    },
    getPlayerHealth() {
      return (name) => {
        if (name === "player") {
          return this.game.players.player.health;
        } else if (name === "enemy") {
          return this.game.players.enemy.health;
        }
      };
    },
    getPlayerStrenght() {
      return (player) => {
        if (player === "player") {
          return this.game.players.player.strenght;
        } else if (player === "enemy") {
          return this.game.players.enemy.strenght;
        }
      };
    },
    getPlayerGravity() {
      return (player) => {
        if (player === "player") {
          return this.game.players.player.gravity;
        } else if (player === "enemy") {
          return this.game.players.enemy.gravity;
        }
      };
    },
    getPlayerState() {
      return (player) => {
        if (player === "player") {
          return this.game.players.player.state;
        } else if (player === "enemy") {
          return this.game.players.enemy.state;
        }
      }
    },
    getFightTime() {
      return this.game.settings.fightTime;
    },
    getWinner() {
      return this.game.settings.winner;
    },
    getPauseMode() {
      return this.game.settings.pause;
    },
    getPauseKey() {
      return this.game.settings.keys.pause;
    },
    getFramerate() {
      return this.game.settings.frameRate;
    },
  },

  actions: {
    setPlayerName(player, name) {
      if (player === "player") {
        this.game.players.player.name = name;
      } else if (player === "enemy") {
        this.game.players.enemy.name = name;
      }
    },
    setPlayerStrenght(player, strenght) {
      if (player === "player") {
        this.game.players.player.strenght = strenght;
      } else if (player === "enemy") {
        this.game.players.enemy.strenght = strenght;
      }
    },
    setPlayerHealth(player, health) {
      if (player === "player") {
        this.game.players.player.health = health;
      } else if (player === "enemy") {
        this.game.players.enemy.health = health;
      }
    },
    setPlayerGravity(player, gravity) {
      if (player === "player") {
        this.game.players.player.gravity = gravity;
      } else if (player === "enemy") {
        this.game.players.enemy.gravity = gravity;
      }
    },
    setTogglePause(toggle = true) {
      this.game.settings.pause = toggle ? !this.game.settings.pause : false;
    },
    setWinner(name) {
      if (name === "player") {
        this.game.players.enemy.isDead = true;
        this.game.settings.winner = this.game.players.player.name;
      } else if (name === "enemy") {
        this.game.players.player.isDead = true;
        this.game.settings.winner = this.game.players.enemy.name;
      }
    },
    setTime(time) {
      if (time == "timeout") {
        this.game.settings.fightTime = time;
      } else {
        this.game.settings.fightTime = time;
      }
    },
    setFramerate(val) {
      this.game.settings.frameRate = val;
    },
    setPauseKey(val) {
      this.game.settings.keys.pause = val;
    },
  },
});
