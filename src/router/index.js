import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Welcome from '@/components/Welcome'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
import Office from  '@/components/Office'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },

    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },

    {
      path: '/office/create',
      name: 'Office',
      component: Office
    }
  ]
})
