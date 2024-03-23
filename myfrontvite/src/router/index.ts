import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '@/views/toDoList.vue'
import Article from '../views/Article.vue'
console.log(import.meta.env.BASE_URL)
console.log(import.meta.url)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ToDoList
    },
    {
      path: '/toDoList',
      name: 'toDoList',
      component: () => import('../views/toDoList.vue')
    },
    {
      path: '/Article/:page',
      name: 'Article',
      component: Article,
      children: [
        {
          path: ':title',
          name: 'Article',
          component: Article
        }
      ],
      props: (route) => {
        return {
          // 在這邊觸發 route 再用 props 結合到元件上
          page: route.params.page,
          title: route.params.title
        }
      }
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: ToDoList,
      meta: {
        requiresAuth: false
      }
    }

  ]
})

export default router
