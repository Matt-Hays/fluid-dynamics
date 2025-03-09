import {createRouter, createWebHistory} from 'vue-router'
import CurveView from "@/views/CurveView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CurveView,
    }
  ],
})

export default router
