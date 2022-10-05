import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const Top = () =>
  import(/* webpackChunkName: "TopPage" */ "../views/TopPage.vue");
const Tetris = () =>
  import(/* webpackChunkName: "TetrisPage" */ "../views/Stage.vue");
const Ranking = () =>
  import(/* webpackChunkName: "RankingPage" */ "../views/Ranking.vue");

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/tetris",
    name: "Tetris",
    component: Tetris,
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
