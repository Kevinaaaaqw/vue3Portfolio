import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/HomePage.vue')
    },
    {
      path: '/toDoList',
      name: 'toDoList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/toDoList.vue')
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
