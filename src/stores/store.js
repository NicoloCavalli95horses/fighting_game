import { defineStore } from "pinia";

export const Store = defineStore({
  id: "gameSettings",
  state: () => ({
    window: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    game: {
      settings: {
        fightTime: 60,
        frameRate: 10,
        pause: false,
        winner: false,
        keys: {
          pause: 'p'
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
          state: 'idle',
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
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Idle',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            jump: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Jump',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            fall: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Fall',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Attack1',
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            run: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Run',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Death',
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            hit: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Hit',
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
          }
        },
        enemy: {
          name: "Kenji",
          position: {
            x: (window.innerWidth - 100),
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
          state: 'idle',
          canAttack: true,
          isDead: false,
          mirror: false,
          health: 100,
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
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Idle',
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            jump: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Jump',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Attack1',
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            fall: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Fall',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            run: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Run',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Death',
              width: 1400,
              height: 200,
              total: 7,
              i: 1,
            },
            hit: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Hit',
              width: 600,
              height: 200,
              total: 3,
              i: 1,
            },
          }
        },
      },
    },
  }),

});
