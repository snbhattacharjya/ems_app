import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {

  },
  state: {
    user: {
      token: '',
      name: '',
      level: '',
      area: ''
    }
  },
  getters: {
    getAccessToken(state){
      return state.user.token
    },
    getUserName(state){
      return state.user.name
    },
    getUserLevel(state){
      return state.user.level
    }
  },
  actions: {
    storeAccessToken(context, token){
      context.commit('storeAccessToken', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.user.token
      axios.get('/user')
      .then(response => {
        context.commit('storeUserDetails',response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyToken(context, state){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.user.token
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
      state.user.token = token
    },
    storeUserDetails(state, user){
      state.user.name = user.name
      state.user.level = user.level
      state.user.area = user.area
    },
    destroyToken(state){
      state.user.token = ''
      state.user.name = ''
      state.user.level = ''
      state.user.area = ''
    }
  }

})
