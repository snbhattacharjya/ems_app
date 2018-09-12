import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    token: '',
    user: [],
    menus :[],
    previllege:[],
    dashboard:[]
  },
  getters: {
    getAccessToken(state){
      return state.token
    },
    getUser(state){
      return state.user
    },
    getMenu(state){
      return state.menus
    },
    getPrevillege(state){
      return state.previllege
    },
    getDashboard(state){
      return state.dashboard
    }
  },
  actions: {
    storeAccessToken(context, token){
      context.commit('storeAccessToken', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/user')
      .then(response => {
        context.commit('storeUserDetails',response.data.user)
        context.commit('storeMenuDetails',response.data.menu)
        context.commit('storePrevillegeDetails',response.data.previllege)
        context.commit('storeDashboard',response.data.dashboard)
        //console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyToken(context, state){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/logout',{

      })
      .then(response => {
        context.commit('destroyToken')
      })
      .catch(error => {

      })
    }

  },
  mutations: {
    storeAccessToken(state, token){
      state.token = token
    },
    storeUserDetails(state, user){
      state.user = user
    },
    storeMenuDetails(state, menu){
      state.menus = menu
    },
    storePrevillegeDetails(state, previllege){
      state.previllege = previllege
    },
    storeDashboard(state, dashboard){
      state.dashboard = dashboard
    },
    destroyToken(state){
      state.token = ''
      state.user = ''
      state.menus = ''
      state.previllege = ''
      state.dashboard = ''
    }
  }

})
