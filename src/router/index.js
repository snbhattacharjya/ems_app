import Vue from 'vue'
import Router from 'vue-router'
import paths from './path'


Vue.use(Router)
const router =  new Router({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths
})
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
