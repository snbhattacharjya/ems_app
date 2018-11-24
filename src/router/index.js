import Vue from 'vue'
import Router from 'vue-router'
import paths from './path'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '../store'

Vue.use(Router)
const router =  new Router({
  base: '/',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths
})
router.beforeEach((to, from, next) => {

  NProgress.start();

  if(!to.meta.public && window.sessionStorage.getItem('is_authenticated') == null){
    next('/signin')
  }
  document.title = to.meta.title
  next()
})
router.afterEach((to, from) => {

  NProgress.done();
});

function redirectIfNotAuth (to, from, next) {
  if(!to.meta.public && window.sessionStorage.getItem('is_authenticated') == null){
    return '/signin'
  }
}


export default router
