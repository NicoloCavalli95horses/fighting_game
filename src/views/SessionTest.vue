<template>
  <template v-if="!play">
    <div class="back"><RouterLink to="/">Back</RouterLink></div>
    <div class="page-bg">
      <div class="page-container">
        <h3>Online mode</h3>
        <template v-if="getCode && !hasCode">
          <p> Your code: <code> {{ code }} </code>. Send it to a friend! </p>
          <div class="input-box">
            <Btn @click="play = true" text="Play" />
          </div>
        </template>
        <template v-if="hasCode">
          <p class="m-22">Use the code your friend gave you</p>
          <div class="input-box">
            <InputText placeholder="insert your code here" @update="(val) => (receivedCode = val)" />
            <Btn @click="play = true" :disabled="!receivedCode" text="Play" />
          </div>
        </template>

        <!-- Absolute positioned footer buttons -->
        <div class="abs-bottom">
          <Btn @click="hasCode = !hasCode" text="I have a code" class="r-12" />
          <Btn @click="generateCode(5); getCode = true; hasCode = false;" text="Generate new code" />
        </div>
      </div>
    </div> 
  </template>

  <template v-else>
    <div class="session-info">
      <p>Session :{{ session }}</p>
    </div>
    <Game />
  </template>
  
</template>

<script setup>
// ==============================
// Import
// ==============================
import Btn from "../components/Btn.vue";
import InputText from "../components/InputText.vue";
import { RouterLink, RouterView } from "vue-router";
import { computed, onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import io from "socket.io-client";
import Game from "../views/Game.vue"

const socket = ref(null);
const getCode = ref(false);
const hasCode = ref(false);
const receivedCode = ref(null);
const code = ref(null);
const play = ref(false);
const session = ref(null);

const getSession = computed(() => {
  socket.value.on( receivedCode, data => {
    session.value = data;
    console.log( data );
  })
})

// ==============================
// Functions
// ==============================
function generateCode(length) {
  // Generate code of custom length
  code.value = [Math.random() * 10].toString().split(".").join("").slice(0, length + 1);

  // Send the code to the server
  socket.value.emit("clientCode", code.value);
}

// ==============================
// Life cycle
// ==============================
onBeforeMount(() => {
  socket.value = io("http://localhost:3000");
});

onMounted(() => {
  socket.value.on("messages", (data) => {
    received.value = data;
  });
});

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

    code {
      color: orange;
      font-size: 22px;
      font-weight: bold;
      padding: 6px 8px;
      margin: 0 3px;
      border-radius: 6px;
      background-color: #555;
    }

    p {
      margin: 25px;
      line-height: 2.5;
      font-size: 20px;
      letter-spacing: 3px;
    }

    .input-box {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      height: 100px;
      border-radius: 12px;
      background-color: #333;
    }
  }

  .abs-bottom {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    padding: 20px;
    display: flex;
    justify-content: center;
    background-color: #333;
  }
}

.session-info {
  box-sizing: content-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 12px;
  width: 160px;
  height: 40px;
  position: absolute;
  top: 20px;
  left: 50%;
  background-color: #555;
  transform: translateX(-50%);
}
</style>
