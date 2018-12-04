// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import store from './store'
import printjs from 'print-js'
import moment from 'moment'
import IdleVue from 'idle-vue'




Vue.prototype.moment = moment
Vue.use(Vuetify)
Vue.use(VeeValidate)
const VueScrollTo = require('vue-scrollto')
Vue.use(VueScrollTo)
//Vue.use(printjs)
Vue.config.productionTip = false
//axios.defaults.baseURL = 'http://10.247.144.104/ems_service/public/index.php/api' //live server
//axios.defaults.baseURL = 'http://service.ems.test/api' //local
axios.defaults.baseURL = 'http://10.173.128.19/api' //local test server
window.axios = axios
const eventsHub = new Vue()
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60000*15 //15 minutes
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      messageStr: 'Window is Idle for 15 minutes, you will be loged out'
    }
  },
  onIdle() {
    if(window.sessionStorage.getItem('is_authenticated') != null){
    alert('Window is Idle for 15 minutes, you will be loged out')
    store.dispatch('destroyToken')
    window.sessionStorage.removeItem('is_authenticated')
    this.$router.replace("/")
    }
  },
  onActive() {
    //alert('Welcome')
  },
  router,
  store,
  components: { App},
  template: '<App/>'
})

