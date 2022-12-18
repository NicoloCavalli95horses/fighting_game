<template>
  <div class="back"><RouterLink to="/">Back</RouterLink></div>
  <div class="page-bg">
    <div class="page-container">
      <h3>About</h3>
      <p>"The Last Warrior" is a simple fighting game where two players have to battle each other to death. The game mechanics are very simple: move and attack! <br><br>
      This game is developed in the Vue.js ecosystem and makes use of Vue Routing and Pinia state management.</p>
    </div>
  </div>
  <div class="credits">
    <h5> Nicolò Cavalli - 2022 </h5>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.page-bg {
  .page-container {
    h3 {
      margin-top: 20px;
      text-align: center;
      width: 100%;
      display: inline-block;
    }

    p {
      margin: 25px;
      line-height: 1.8;
      font-size: 20px;
      letter-spacing: 3px;
    }
  }
}
.credits {
  position: absolute;
  bottom: 44px;
  left: 50%;
  transform: translate(-50%, 0);
  h5 {
    font-size: 16px;
    opacity: 80%;
  }
}
</style>
