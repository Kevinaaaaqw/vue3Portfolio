import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '@/views/toDoList.vue'
import Forum from '@/views/forum/forum.vue'
import ForumArticle from '@/views/forum/article.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/forum/loginPage.vue'
import NotFoundPage from '@/views/forum/notFoundPage.vue'
import Home from '@/views/forum/home.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
    //論壇頁面
    {
      path: '/forum',
      name: 'home',
      component: Home
    },
    {
      path: '/forum/list',
      name: 'forum',
      component: Forum
    },
    {
      path: '/forum/article',
      name: 'article',
      component: ForumArticle
    },
    {
      path: '/forum/login',
      name: 'login',
      component: Login
    },
    {
      // path: "*",
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFoundPage,
      meta: {
        requiresAuth: false
      }
    }
  ]
})

export default router
