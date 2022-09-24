<template>
  <div class="background flex-column">
    <ul>
      <RouterLink to="/online"><li>Online mode</li></RouterLink>
      <RouterLink to="/settings"><li>Game settings</li></RouterLink>
      <RouterLink to="/credits"><li>Credits</li></RouterLink>
      <li>Credits</li>
    </ul>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  background-color: #111;
  ul {
    text-align: center; 
  }
}

li {
    font-size: 28px;
    padding: 20px;
    &:not(:last-child) {
      border-bottom: 2px solid orangered;
    }
    &:hover {
      cursor: pointer;
      transition-duration: 600ms;
      filter: brightness(120%);
      transform: scale(1.1);
      padding: 30px;
    }
  }
</style>
