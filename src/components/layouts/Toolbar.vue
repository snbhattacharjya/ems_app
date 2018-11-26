<template>
  <v-toolbar color="grey lighten-5">
    <v-toolbar-title>
    <router-link to="/" tag="span" style="cursor: pointer">
    <v-avatar
      color="grey lighten-5"
    >
      <img src="/static/national20emblem.jpg" alt="avatar">
    </v-avatar></router-link>
    <router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black blue--text text--darken-4">PPMS</router-link>
    <span class="caption">(Polling Personnel Management System)</span></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down" v-if="!this.$store.getters.getAccessToken.access_token">
      <v-btn flat to='/' v-scroll-to="'#home'">Home</v-btn>
      <v-btn flat to='/#features' v-scroll-to="'#feature'">Features</v-btn>
      <v-btn flat to='/#services' v-scroll-to="'#services'">Services</v-btn>
      <v-btn  flat to='/signin'>Sign In</v-btn>

    </v-toolbar-items>

    <v-toolbar-items class="hidden-sm-and-down" v-else>
      <v-btn flat to='/' v-scroll-to="'#home'">Home</v-btn>
      <v-btn flat to='/#features' v-scroll-to="'#feature'">Features</v-btn>
      <v-btn flat to='/#services' v-scroll-to="'#services'">Services</v-btn>
      <v-btn >Welcome {{this.$store.getters.getUser.user_id}}</v-btn>
      <v-menu bottom left>

            <v-btn
              slot="activator"
              dark
              icon
            >
               <v-icon color="black">more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile to="/dashboard">
                <v-list-tile-title>Dashboard</v-list-tile-title>
              </v-list-tile>
              <v-list-tile @click="logout">
                <v-list-tile-title>Sign Out</v-list-tile-title>
              </v-list-tile>
            </v-list>
      </v-menu>
      <!-- <v-btn  @click="logout">Sign Out</v-btn> -->
    </v-toolbar-items>

  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {

      }
    },
    methods:{
      logout(){
        this.$store.dispatch('destroyToken')
        this.$router.replace("/")
      },
    }
  }
</script>

