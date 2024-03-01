import { createRouter, createWebHistory } from 'vue-router'
import Article from '../views/Article.vue'

const router = createRouter({
  history: createWebHistory(),
  strict: true,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomePage.vue')
    },
    {
      path: '/toDoList',
      name: 'toDoList',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/toDoList.vue')
    },
    {
      path: '/aboutView',
      name: 'aboutView',

      component: () => import('../components/AboutView.vue')
    },
    {
      path: '/test1',
      name: 'test1',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/test.vue')
    },
    {
      path: '/Article/:page',
      name: 'Article',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => Article,
      children: [
        {
          path: ':title',
          name: 'Article',
          component: () => Article
        }
      ],
      props: (route) => {
        return {
          // 在這邊觸發 route 再用 props 結合到元件上
          page: route.params.page,
          title: route.params.title
        }
      }
    }
  ],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
