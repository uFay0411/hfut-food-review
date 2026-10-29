import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: '发现好味道' } },
    {
      path: '/canteens',
      component: () => import('../views/CanteensView.vue'),
      meta: { title: '逛食堂' },
    },
    {
      path: '/dishes/:id',
      component: () => import('../views/DishView.vue'),
      meta: { title: '菜品详情' },
    },
    {
      path: '/taste',
      component: () => import('../views/TasteView.vue'),
      meta: { title: '我的口味' },
    },
    { path: '/me', component: () => import('../views/MeView.vue'), meta: { title: '我的' } },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/NotFoundView.vue'),
      meta: { title: '页面未找到' },
    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})
router.afterEach((to) => {
  document.title = `${String(to.meta.title)} · 工大食鉴`
})
