import { createRouter, createWebHistory } from "vue-router";
import Homepage from "../views/Homepage.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Homepage,
    },
    {
      path: "/game",
      name: "game",
      component: () => import('../views/Game.vue'),
    },
    {
      path: "/online",
      name: "online",
      component: () => import('../views/Online.vue'),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import('../views/Settings.vue'),
    },    {
      path: "/credits",
      name: "credits",
      component: () => import('../views/Credits.vue'),
    }
  ],
});

export default router;
