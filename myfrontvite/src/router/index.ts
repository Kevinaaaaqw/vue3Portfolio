import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import ToDoList from '@/views/toDoList.vue'
import Forum from '@/views/forum/forum.vue'
import ForumArticle from '@/views/forum/article.vue'
import Article from '@/views/Article.vue'
import Login from '@/views/forum/loginPage.vue'
import NotFoundPage from '@/views/forum/notFoundPage.vue'
import Home from '@/views/forum/home.vue'

// 已占用 name toDoList
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'homePortfolioSelf',
      meta: { title: '履歷空間 - 首頁' },
      component: () => import('../views/portfolioSelf/index.vue')
    },
    {
      path: '/AboutMe',
      name: 'homePortfolioAboutMe',
      component: () => import('../views/portfolioSelf/aboutMe.vue')
    },
    {
      path: '/WorkExperience',
      name: 'homePortfolioWorkExperience',
      meta: { title: '履歷空間 - 工作與技能' },
      component: () => import('../views/portfolioSelf/workExperience.vue')
    },
    {
      path: '/projects',
      name: 'homeProjects',
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
      path: '/project2/MyTasks',
      name: 'toDoListMyTasks',
      meta: { title: '代辦事項 - 所有事項' },
      component: () => import('../views/toDoList/MyTasksView.vue')
    },
    {
      path: '/project2/InProgress',
      name: 'toDoListInProgress',
      meta: { title: '代辦事項 - 進行中' },
      component: () => import('../views/toDoList/InProgress.vue')
    },
    {
      path: '/project2/Completed',
      name: 'toDoListCompleted',
      meta: { title: '代辦事項 - 已完成' },
      component: () => import('../views/toDoList/CompletedViews.vue')
    },
    // 作品集 --> 電影清單
    {
      path: '/project3/search',
      name: 'project3Search',
      meta: { title: 'OMDb電影清單 - 搜尋' },
      component: () => import('../views/project3MovieSearch/search.vue')
    },
    {
      path: '/project3/list',
      name: 'project3List',
      meta: { title: 'OMDb電影清單 - 收藏清單' },
      component: () => import('../views/project3MovieSearch/movieList.vue')
    },
  ]
})

router.beforeEach((to) => {
  const { title } = to.meta;
  const defaultTitle = '履歷空間';
  // const defaultDescription = '';

  document.title = (title || defaultTitle) as string

  // const descriptionElement = document.querySelector('head meta[name="description"]')

  // descriptionElement.setAttribute('content', description || defaultDescription)
})
export default router
