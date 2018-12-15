import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  data: () => ({

  }),
  modules: {

  },
  state: {
    token: [],
    user: [],
    menus :[],
    previllege:[],
    dashboard:[],
    election:[],
    misreport:[],
    pp2report:[],
    personnel:[],
    qualification:[],
    language:[],
    remark:[],
    block_muni:[],
    assembly_all:[],
    assembly_local:[]
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
    },
    getpersonnel(state){
      return state.personnel
    },
    getqualification(state){
      return state.qualification
    },
    getlanguage(state){
      return state.language
    },
    getremark(state){
      return state.remark
    },
    getblockmuni(state){
      return state.block_muni
    },
    getassemblyall(state){
      return state.assembly_all
    },
    getassemblylocal(state){
      return state.assembly_local
    }
  },
  actions: {
    storeAccessToken(context, token){
      context.commit('storeAccessToken', token)
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token.access_token
      // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
      // axios.defaults.headers.Common['Access-Control-Max-Age'] = 86400
      axios.get('/user')
      .then(response => {
        context.commit('storeUserDetails',response.data.user)
        context.commit('storeMenuDetails',response.data.menu)
        context.commit('storePrevillegeDetails',response.data.previllege)
        context.commit('storeDashboard',response.data.dashboard)
        context.commit('storeElection',response.data.election)
        window.sessionStorage.setItem('is_authenticated', true)
        //console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    destroyToken(context, state){
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token.access_token
      axios.get('/logout',{

      })
      .then(response => {
        context.commit('destroyToken')
        window.sessionStorage.setItem('is_authenticated', null)
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
    },
    storepersonnel(context,personneldata){
      context.commit('storepersonnel', personneldata)
    },
    updatepersonnel(context,personneldata){
      context.commit('updatepersonnel', personneldata)
    },
    storequalification(context,qualificationdata){
      context.commit('storequalification', qualificationdata)
    },
    storelanguage(context,languagedata){
      context.commit('storelanguage', languagedata)
    },
    storeremark(context,remarkdata){
      context.commit('storeremark',remarkdata)
    },
    storeblockmuni(context,blockmunidata){
      context.commit('storeblockmuni', blockmunidata)
    },
    storeassemblyall(context,assemblyalldata){
      context.commit('storeassemblyall', assemblyalldata)
    },
    storeassemblylocal(context,assemblylocaldata){
      context.commit('storeassemblylocal', assemblylocaldata)
    },

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
      state.user['officelevel'] = id
    },
    storepersonnel(state,personneldata){
      state.personnel = personneldata
    },
    updatepersonnel(state,personneldata){
      state.personnel.push(personneldata)
    },
    storequalification(state,qualificationdata){
      state.qualification=qualificationdata
    },
    storelanguage(state,languagedata){
      state.language=languagedata
    },
    storeremark(state,remarkdata){
      state.remark=remarkdata
    },
    storeblockmuni(state,blockmunidata){
      state.block_muni=blockmunidata
    },
    storeassemblyall(state,assemblyalldata){
      state.assembly_all=assemblyalldata
    },
    storeassemblylocal(state,assemblylocaldata){
      state.assembly_local=assemblylocaldata
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
      state.personnel=''
      state.qualification=''
      state.language=''
      state.remark=''
      state.block_muni=''
      state.assembly_all=''
      state.assembly_local=''
    }
  }

})
