<template>
  <div class="back"><RouterLink to="/">Back</RouterLink></div>
  <div class="page-bg">
    <div class="page-container">
      <h3>Chat</h3>

      <div class="chat-box">
        <div v-for="msg in msgs" :key="msg">
          <p>{{ msg }}</p>
        </div>
      </div>

      <div class="abs-bottom">
        <InputText placeholder="your message here" @update="val => text = val" @blur="send" />
      </div>
    </div>
  </div>
</template>

<script setup>
// ==============================
// Import
// ==============================
import InputText from "../components/InputText.vue";
import { onBeforeMount, onMounted, ref } from "@vue/runtime-core";
import io from "socket.io-client";

const socket = ref(null);
const text = ref("");
const msgs = ref([]);

// ==============================
// Functions
// ==============================
const obj = {
  title: 'title test',
  body: 'body content'
}
function send(){
  socket.value.emit("send", JSON.stringify( obj ));
}
// ==============================
// Life cycle
// ==============================
onBeforeMount(() => {
  socket.value = io("http://localhost:3000");
});

onMounted(() => {
  socket.value.on("message", (data) => {
    msgs.value = JSON.parse( data );
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

    .chat-box {
      margin-top: 15px;
      width: 100%;
      height: 300px;
      border-radius: 20px;
      background-color: #333a;

      p {
        margin: 10px 20px;
        background-color: #555;
        border-radius: 12px;
        padding: 6px 8px;
        width: max-content;
      }
    }
  }
}


.abs-bottom {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: 80px;
    padding: 20px;
    display: flex;
    justify-content: center;
    background-color: #333;
  }
</style>
