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
      path: "/ChoosePlayers",
      name: "choosePlayers",
      component: () => import('../views/ChoosePlayers.vue'),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import('../views/Settings.vue'),
    },    {
      path: "/about",
      name: "about",
      component: () => import('../views/About.vue'),
    }
  ],
});

export default router;
