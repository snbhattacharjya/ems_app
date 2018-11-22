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
axios.defaults.baseURL = 'http://service.ems.test/api'
window.axios = axios
const eventsHub = new Vue()
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 900000
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  data () {
    return {
      messageStr: 'Hello'
    }
  },
  onIdle() {
    if(window.sessionStorage.getItem('is_authenticated') != null){
    alert('Timeout')
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
  components: { App },
  template: '<App/>'
})

