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
    dashboard:[],
    election:[],
    misreport:[],
    pp2report:[],
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
    },
    getElection(state){
      return state.election
    },
    getMisreport(state){
      return state.misreport
    },
    getpp2report(state){
      return state.pp2report
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
        context.commit('storeElection',response.data.election)
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
    },
    storeMISreport(context,misdata){
      context.commit('storeMisreport', misdata)
    },
    storeofficecategory(context,id){
      context.commit('storeofficecategory',id)
    },
    storePP2report(context,pp2data){
      context.commit('storePP2report', pp2data)
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
    storeElection(state, election){
      state.election = election
    },
    storeMisreport(state,misdata){
      state.misreport = misdata
    },
    storePP2report(state,pp2data){
      state.pp2report = pp2data
    },
    storeofficecategory(state,id){
     // if(id === '01'){}
      state.user['officelevel'] = id
    },
    destroyToken(state){
      state.token = ''
      state.user = ''
      state.menus = ''
      state.previllege = ''
      state.dashboard = ''
      state.election= ''
      state.misreport= ''
      state.pp2report=''
    }
  }

})
