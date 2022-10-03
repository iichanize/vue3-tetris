import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Top from "../views/TopPage.vue";
import Stage from "../views/Stage.vue";
import Ranking from "../views/Ranking.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/tetris",
    name: "Tetris",
    component: Stage,
  },
  {
    path: "/ranking",
    name: "Ranking",
    component: Ranking,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
