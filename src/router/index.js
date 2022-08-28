import { createRouter, createWebHistory } from "vue-router";
import MainCanvas from "../views/MainCanvas.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "main",
      component: MainCanvas,
    }
  ],
});

export default router;
