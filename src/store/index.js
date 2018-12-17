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
    assembly_local:[],
    category:[],
    institute:[],
    pc:[],
    police:[],
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
    },
    getcategory(state){
      return state.category
    },
    getinstitute(state){
      return state.institute
    },
    getpc(state){
      return state.pc
    },
    getpolice(state){
      return state.police
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
    storequalification(context){
      if(context.state.qualification.length== 0){
        axios.get('/qualifications')
          .then((response, data) => {
           response.data.forEach(item => {
             item.name=item.name.toUpperCase()
            })
            context.commit('storequalification', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storelanguage(context){
      if(context.state.language.length== 0){
        axios.get('/languages')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
            context.commit('storelanguage', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storeremark(context){
      if(context.state.remark.length== 0){
        axios.get('/remarks')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
            context.commit('storeremark', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storeblockmuni(context){
      if(context.state.block_muni.length== 0){
        axios.get('/blockmunis')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
             response.data.push({name:"OTHER",id:"999901"})
             context.commit('storeblockmuni', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storeassemblyall(context){
      if(context.state.assembly_all.length== 0){
        axios.get('/allassemblies')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.id+'-'+item.name.toUpperCase()
             })
             response.data.push({name:"OTHER",id:"999"})
             context.commit('storeassemblyall', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storeassemblylocal(context){
      if(context.state.assembly_local.length== 0){
        axios.get('/assemblies')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.id+'-'+item.name.toUpperCase()
             })
             response.data.push({name:"OTHER",id:"999"})
             context.commit('storeassemblylocal', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }

    },
    storecategory(context){
      if(context.state.category.length== 0){
        axios.get('/categories')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
             context.commit('storecategory', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
    },
    storeinstitute(context){
      if(context.state.institute.length== 0){
        axios.get('/institutes')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
             context.commit('storeinstitute', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
    },
    storepc(context){
      if(context.state.pc.length== 0){
        axios.get('/pcs')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
             context.commit('storepc', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
    },
    storepolice(context){
      if(context.state.police.length== 0){
        axios.get('/policestations/all')
          .then((response, data) => {
            response.data.forEach(item => {
              item.name=item.name.toUpperCase()
             })
             context.commit('storepolice', response.data)
          })
          .catch(error => {
            console.log(error)
          })
        }
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
    storecategory(state,categorydata){
      state.category=categorydata
    },
    storeinstitute(state,institutedata){
      state.institute=institutedata
    },
    storepc(state,pcdata){
      state.pc=pcdata
    },
    storepolice(state,policedata){
      state.police=policedata
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
      state.category=''
      state.institue=''
      state.pc=''
      state.police=''
    }
  }

})
