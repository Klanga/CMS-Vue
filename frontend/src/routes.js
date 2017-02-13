/**
 * @author leonchaochan
 * @email leonchaochan@outlook.com
 * @create date 2017‎-01‎-‎13 ‏‎11:51:40
 * @modify date 2017‎-0‎2-11 ‏‎13:20:15
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/authorize',
      component: resolve => require(['./pages/Authorize.vue'], resolve),
      meta: { title: '口令验证' }
    },
    {
      path: '/',
      component: resolve => require(['./pages/Index.vue'], resolve),
      meta: { title: 'dollarsbbs' },
      children: [
        { path: 'notice', meta: { title: '公告' }, component: resolve => require(['./pages/subPages/Notice.vue'], resolve) },
        { path: 'about', meta: { title: '关于' }, component: resolve => require(['./pages/subPages/About.vue'], resolve) },
        { path: 'help', meta: { title: '帮助' }, component: resolve => require(['./pages/subPages/Help.vue'], resolve) },
        { path: 'update', meta: { title: '更新' }, component: resolve => require(['./pages/subPages/Update.vue'], resolve) },
        { path: 'suggestorBug', meta: { title: '建议/bug' }, component: resolve => require(['./pages/subPages/SuggestOrBug.vue'], resolve) },
        { path: 'board', meta: { title: '揭示板' }, component: resolve => require(['./pages/subPages/Board.vue'], resolve) },
        { path: 'bump', meta: { title: '灌水' }, component: resolve => require(['./pages/subPages/Bump.vue'], resolve) },
        { path: 'voice', meta: { title: '心の声' }, component: resolve => require(['./pages/subPages/Voice.vue'], resolve) },
        { path: 'bullshit', meta: { title: '吐槽' }, component: resolve => require(['./pages/subPages/Bullshit.vue'], resolve) },
        { path: 'activity', meta: { title: '活动' }, component: resolve => require(['./pages/subPages/Activity.vue'], resolve) },
        { path: 'acg', meta: { title: '二次元' }, component: resolve => require(['./pages/subPages/Acg.vue'], resolve) },
        { path: 'shinban', meta: { title: '新番' }, component: resolve => require(['./pages/subPages/Shinban.vue'], resolve) },
        { path: 'cos', meta: { title: 'COS' }, component: resolve => require(['./pages/subPages/Cos.vue'], resolve) },
        { path: 'guru', meta: { title: '大触' }, component: resolve => require(['./pages/subPages/Guru.vue'], resolve) },
        { path: 'game', meta: { title: '游戏' }, component: resolve => require(['./pages/subPages/Game.vue'], resolve) },
        { path: '/posts/:id', meta: { title: '帖子' }, component: resolve => require(['./pages/subPages/Post.vue'], resolve)}
      ]
    },
    { path: '/user', meta: { title: '个人中心' }, component: resolve => require(['./pages/User.vue'], resolve) },
    { path: '*', meta: { title: '404' }, component: resolve => require(['./pages/NotFound.vue'], resolve)} //404 Not Found
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
router.beforeEach((to, from, next) => {
  if (document.cookie!== 'baccano=true' && to.path !== '/authorize') return next(`/authorize?redirect=${to.fullPath}`)
  return next()
})
router.afterEach((to, from) => {
  if(!/^\/posts/g.test(to.path)){
    document.title = to.meta.title
  }
})
export default router
