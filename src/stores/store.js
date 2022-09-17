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
        fightTime: -1,
        gameOver: false
      },
      players: {
        player: {
          name: "player 1",
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
          width: 50,
          height: 150,
          // color: "blue",
          gravity: 0.7,
          isAttacking: false,
          isRunning: false,
          isJumping: false,
          canJump: false,
          isDead: false,
          health: 100,
          strenght: 5,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 180,
            height: 50,
          },
          animation: {
            idle: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Idle.png',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            jump: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Jump.png',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            fall: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Fall.png',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Attack1.png',
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
            run: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Run.png',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              image: new Image(),
              src : 'src/assets/img/characters/samuraiMack/Death.png',
              width: 1200,
              height: 200,
              total: 6,
              i: 1,
            },
          }
        },
        enemy: {
          name: "player 2",
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
          width: 50,
          height: 150,
          // color: "red",
          gravity: 0.7,
          isAttacking: false,
          isRunning: false,
          isJumping: false,
          canJump: false,
          isDead: false,
          health: 100,
          strenght: 5,
          attackBox: {
            position: {
              x: 100,
              y: 100,
            },
            offset: 0,
            width: 180,
            height: 50,
          },
          animation: {
            idle: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Idle.png',
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            jump: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Jump.png',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            attack: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Attack1.png',
              width: 800,
              height: 200,
              total: 4,
              i: 1,
            },
            fall: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Fall.png',
              width: 400,
              height: 200,
              total: 2,
              i: 1,
            },
            run: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Run.png',
              width: 1600,
              height: 200,
              total: 8,
              i: 1,
            },
            death: {
              image: new Image(),
              src : 'src/assets/img/characters/kenji/Death.png',
              width: 1400,
              height: 200,
              total: 7,
              i: 1,
            },
          }
        },
      },
    },
  }),

  // getters: {
  // },

  // actions: {
  // },
});
