import { defineStore } from "pinia";

export const Store = defineStore({
  id: "gameSettings",
  state: () => ({
    game: {
      settings: {
        fightTime: 100,
        frameRate: 10,
        pause: false,
        winner: "",
        keys: {
          pause: "p",
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
        },
        maxValues: {
          health: 180,
          strenght: 20,
          speed: 10,
        },
        players: {
          player: {
            id: '',
          },
          enemy: {
            id: '',
          },
        },
      },
      players: [
        {
          name: "Samurai Mack",
          width: 50,
          height: 150,
          gravity: 0.4,
          state: "idle",
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 110,
          strenght: 8,
          lastKey: null,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          position: {
            x: 0,
            y: 0,
          },
          pos_correction: {
            x: 50,
            y: 280,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          state: 'idle',
          animation: {
            idle: {
              src: "/img/characters/samuraiMack/Idle",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            jump: {
              src: "/img/characters/samuraiMack/Jump",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            fall: {
              src: "/img/characters/samuraiMack/Fall",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              src: "/img/characters/samuraiMack/Attack1",
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            run: {
              src: "/img/characters/samuraiMack/Run",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              src: "/img/characters/samuraiMack/Death",
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            hit: {
              src: "/img/characters/samuraiMack/Hit",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
          },
        },
        {
          name: "Kenji",
          width: 50,
          height: 150,
          gravity: 0.4,
          state: "idle",
          lastKey: null,
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 100,
          strenght: 7,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          position: {
            x: 0,
            y: 0,
          },
          pos_correction: {
            x: 100,
            y: 300,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          state: 'idle',
          animation: {
            idle: {
              src: "/img/characters/kenji/Idle",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            jump: {
              src: "/img/characters/kenji/Jump",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              src: "/img/characters/kenji/Attack1",
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            fall: {
              src: "/img/characters/kenji/Fall",
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            run: {
              src: "/img/characters/kenji/Run",
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              src: "/img/characters/kenji/Death",
              width: 1400,
              height: 200,
              total: 7,
              i: 1,
            },
            hit: {
              src: "/img/characters/kenji/Hit",
              width: 600,
              height: 200,
              total: 3,
              i: 1,
            },
          },
        },
        {
          name: "Kunoichi",
          width: 50,
          height: 150,
          gravity: 0.4,
          state: "idle",
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 90,
          strenght: 12,
          lastKey: null,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          position: {
            x: 0,
            y: 0,
          },
          pos_correction: {
            x: 150,
            y: 300,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          state: 'idle',
          animation: {
            idle: {
              src: "/img/characters/kunoichi/Idle",
              width: 1152,
              height: 128,
              total: 9,
              i: 1,
            },
            jump: {
              src: "/img/characters/kunoichi/Jump",
              width: 1280,
              height: 128,
              total: 10,
              i: 1,
            },
            attack: {
              src: "/img/characters/kunoichi/Attack",
              width: 768,
              height: 128,
              total: 6,
              i: 1,
            },
            fall: {
              src: "/img/characters/kunoichi/Jump",
              width: 1280,
              height: 128,
              total: 10,
              i: 1,
            },
            run: {
              src: "/img/characters/kunoichi/Run",
              width: 1024,
              height: 128,
              total: 8,
              i: 1,
            },
            death: {
              src: "/img/characters/kunoichi/Death",
              width: 640,
              height: 128,
              total: 5,
              i: 1,
            },
            hit: {
              src: "/img/characters/kunoichi/Hit",
              width: 256,
              height: 128,
              total: 2,
              i: 1,
            },
          },
        },
        {
          name: "Toriotoko",
          width: 50,
          height: 150,
          gravity: 0.4,
          state: "idle",
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 160,
          strenght: 9,
          lastKey: null,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 250,
            height: 50,
          },
          position: {
            x: 0,
            y: 0,
          },
          pos_correction: {
            x: 300,
            y: 200,
          },
          velocity: {
            x: 0,
            y: 0,
          },
          state: 'idle',
          animation: {
            idle: {
              src: "/img/characters/toriotoko/Idle",
              width: 576,
              height: 96,
              total: 6,
              i: 1,
            },
            jump: {
              src: "/img/characters/toriotoko/Jump",
              width: 768,
              height: 96,
              total: 8,
              i: 1,
            },
            attack: {
              src: "/img/characters/toriotoko/Attack",
              width: 576,
              height: 96,
              total: 6,
              i: 1,
            },
            fall: {
              src: "/img/characters/toriotoko/Jump",
              width: 768,
              height: 96,
              total: 8,
              i: 1,
            },
            run: {
              src: "/img/characters/toriotoko/Run",
              width: 576,
              height: 96,
              total: 6,
              i: 1,
            },
            death: {
              src: "/img/characters/toriotoko/Death",
              width: 384,
              height: 96,
              total: 4,
              i: 1,
            },
            hit: {
              src: "/img/characters/toriotoko/Hit",
              width: 192,
              height: 96,
              total: 2,
              i: 1,
            },
          },
        },
      ],
    },
  }),
  getters: {
    getPlayer() {
      return (i, property = undefined) => {
        if ( !property ) {
          return this.game.players[i - 1];
        } else {
          return this.game.players[i - 1][property];
        }
      };
    },
    getFightTime() {
      return this.game.settings.fightTime;
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
    setTogglePause(toggle = true) {
      this.game.settings.pause = toggle ? !this.game.settings.pause : false;
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
    }
  },
});
