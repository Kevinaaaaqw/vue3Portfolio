import { createRouter, createWebHistory } from 'vue-router'
import ToDoList from '@/views/toDoList.vue'
import Forum from '@/views/forum/forum.vue'
import ForumArticle from '@/views/forum/article.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/forum/loginPage.vue'
import NotFoundPage from '@/views/forum/notFoundPage.vue'
import Home from '@/views/forum/home.vue'
import { title } from 'process'

// 已占用 name toDoList
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'portfolioSelf',
      meta: { title: '履歷空間 - 首頁' },
      component: () => import('../views/portfolioSelf/index.vue')
    },
    {
      path: '/AboutMe',
      name: 'portfolioAboutMe',
      component: () => import('../views/portfolioSelf/aboutMe.vue')
    },
    {
      path: '/WorkExperience',
      name: 'portfolioWorkExperience',
      meta: { title: '履歷空間 - 工作與技能' },
      component: () => import('../views/portfolioSelf/workExperience.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      meta: { title: '履歷空間 - 作品介紹' },
      component: () => import('../views/portfolioSelf/projects.vue')
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
    },
    //作品集-->toDoList 執行清單
    {
      path: '/MyTasks',
      name: 'toDoListMyTasks',
      component: import('../views/toDoList/MyTasksView.vue')
    },
    {
      path: '/InProgress',
      name: 'toDoListInProgress',
      component: import('../views/toDoList/InProgress.vue')
    },
    {
      path: '/Completed',
      name: 'toDoListCompleted',
      component: import('../views/toDoList/CompletedViews.vue')
    },
  ]
})

router.beforeEach((to) => {
  const { title, description } = to.meta;
  const defaultTitle = '履歷空間';
  const defaultDescription = '';

  document.title = (title || defaultTitle) as string

  // const descriptionElement = document.querySelector('head meta[name="description"]')

  // descriptionElement.setAttribute('content', description || defaultDescription)
})
export default router
