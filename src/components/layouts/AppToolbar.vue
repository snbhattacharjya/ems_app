<template>
  <div id="dashboard">
    <v-toolbar :clipped-left="true" color="primary" app dark>
      <v-toolbar-side-icon @click="viw" ></v-toolbar-side-icon>
      <v-toolbar-title> <v-avatar color="primary">
            <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">
          </v-avatar><router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black">EMS</router-link></v-toolbar-title>
      <v-spacer></v-spacer>

        Welcome {{ getUser.name }}
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
                v-for="(item, i) in items"
                :key="i"
                :to="item.path"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-icon @click="logout">exit_to_app</v-icon>

    </v-toolbar>
    <app-drawer :drawer="show"></app-drawer>
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
        //drawer:null,
        items: [
          {title: 'Profile', path: '/#'},
          {title: 'Settings', path: '/#'}
        ]

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
        return this.$store.getters.getUser      }
    }
  }
</script>

