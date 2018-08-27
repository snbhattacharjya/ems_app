import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    token: ''
  },
  getters: {
    getAccessToken(state){
      return state.token
    }
  },
  actions: {
    storeAccessToken(context, token){
      context.commit('storeAccessToken', token)
    }
  },
  mutations: {
    storeAccessToken(state, token){
      state.token = token
    }
  }

})
