import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    token: '',
    username: '',
    level: '',
    area: ''
  },
  getters: {
    getAccessToken(state){
      return state.token
    },
    getUserName(state){
      return state.username
    }
  },
  actions: {
    storeAccessToken(context, token){
      context.commit('storeAccessToken', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
      axios.get('/user')
      .then(response => {
        context.commit('storeUserDetails',response.data)
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
      state.username = user.name
      state.level = user.level
      state.area = user.area
    },
    destroyToken(state){
      state.token = ''
      state.username = ''
      state.level = ''
      state.area = ''
    }
  }

})
