<template>
  <div id="dashboard">
    <v-toolbar :clipped-left="true" color="primary" app dark>
      <v-toolbar-side-icon @click="viw" ></v-toolbar-side-icon>
      <v-toolbar-title>
        <v-avatar color="primary"><img src="/static/Election_Commission_of_India_Logo.png" alt="avatar"></v-avatar>
        <router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black">PPMS</router-link>
      </v-toolbar-title>


      <v-spacer></v-spacer>
      <v-toolbar-title class="ml-0 mr-5">
        {{getElection[0].name}} - {{getElection[0].year}}
      </v-toolbar-title>
      <v-toolbar-title class="ml-5 mr-5">
        {{ moment(new Date()).format('DD/MM/YYYY h:mm a')}}
      </v-toolbar-title>
        Welcome : {{ getUser.name }}({{getUser.user_id}}) <br>District : {{getUser.district[0]}}
        <v-menu bottom left>

            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
                v-for="(item, i) in itPPMS"
                :key="i"
                :to="item.path"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-icon @click="logout">exit_to_app</v-icon>

    </v-toolbar>
    <app-drawer v-if="show"></app-drawer>
    <!-- <v-navigation-drawer class="grey lighten-3" :clipped="true" app v-model="drawer">
  <v-divider></v-divider>
  <v-list dense class="pt-1">
    <h1>Drawer</h1>
    </v-list>

  </v-navigation-drawer> -->
  </div>
</template>

<script>
import AppDrawer from '@/components/layouts/AppDrawer'
  export default {
    data () {
      return {
        username: '',
        show:true,
        datetime:'',
        itPPMS: [
          {title: 'Profile', path: '/#'},
          {title: 'Settings', path: '/#'}
        ]

      }
    },
    beforeUpdate(){
        // console.log('Pasword = '+this.getUser.change_password)
      if(this.getUser.change_password === 0){
        this.$router.replace("/change_password")
        this.show=false
        }
        else if(this.getUser.change_password === 1){
        this.show=true
        }
    },
    created(){

    },
    components: {
      AppDrawer,
    },
    methods: {
      logout(){
        this.$store.dispatch('destroyToken')
        this.$router.replace("/")
      },
      viw(){
        //alert(123)
        console.log('Show before -'+ this.show)
        this.show =!this.show
        console.log('Show after -'+ this.show)
      }
    },
    computed: {
      getUser:function(){
        return this.$store.getters.getUser
      },
      getElection:function(){
        return this.$store.getters.getElection
      },
    }
  }
</script>

