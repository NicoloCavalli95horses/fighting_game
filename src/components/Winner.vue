<template>
  <div v-if="winner" class="absolute">
    <h1>{{ winner }}</h1>
  </div>
</template>

<script setup>
import { Store } from "@/stores/store";
import { computed } from "@vue/runtime-core";

// ==============================
// Variables
// ==============================
const store = Store();
const winner = computed(() => {
    if ( store.game.players.player.isDead || ( store.game.players.player.health < store.game.players.enemy.health && store.game.settings.fightTime === 'timeout' )) {
        return store.game.players.enemy.name + ' win!';
    } else if ( store.game.players.enemy.isDead || ( store.game.players.enemy.health < store.game.players.player.health && store.game.settings.fightTime === 'timeout' ) ) {
        return store.game.players.player.name + ' win!';
    } else if ( !store.game.players.enemy.isDead && !store.game.players.player.isDead && store.game.players.enemy.health == store.game.players.player.health && store.game.settings.fightTime === 'timeout') {
        return 'tie'
    } else {
        return false
    }
})

</script>

<style lang="scss">
 .absolute {
    z-index: 20;
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.3);
    h1 {
        font-size: 50px;
    }
 }

</style>