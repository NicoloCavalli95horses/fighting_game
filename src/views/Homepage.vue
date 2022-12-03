<template>
  <div class="background">

    <div class="flex-column h-100 w-100">
      <h1 class="bottom-24">The last warrior</h1>
      <RouterLink to="/choosePlayers">
        <Btn text="play" />
      </RouterLink>
    </div>

    <div class="top-right flex-center">
      <RouterLink to="/settings"><span class="r-24"><font-awesome-icon icon="fa-solid fa-gear" /></span></RouterLink>
      <RouterLink to="/about"><font-awesome-icon icon="fa-solid fa-circle-info" /></RouterLink>
    </div>
    
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import { RouterLink, RouterView } from "vue-router";
import { Store } from "@/stores/store";
import Btn from '../components/Btn.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'

// ==============================
// Consts
// ==============================
const store = Store();
library.add(faGear, faCircleInfo);
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 100vh;
  background-color: #111;

  h1 {
    font-size: 55px;
  }

  .top-right {
    position: absolute;
    right: 22px;
    top: 22px;
  }
}
</style>
