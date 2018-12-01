<template>
  <v-toolbar color="grey lighten-5">
    <v-toolbar-title>
    <router-link to="/" tag="span" style="cursor: pointer">
    <v-avatar
      color="grey lighten-5"
    >
      <img src="/static/national20emblem.jpg" alt="avatar">
    </v-avatar></router-link>
    <router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black blue--text text--darken-4">WBPPMS</router-link>
    <span class="caption">(West Bengal Polling Personnel Management System)</span></v-toolbar-title>
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
              <v-list-tile @click="dialog = true">
                <v-list-tile-title>Sign Out</v-list-tile-title>
              </v-list-tile>
            </v-list>
      </v-menu>
      <!-- <v-btn  @click="logout">Sign Out</v-btn> -->
    </v-toolbar-items>
<v-dialog
      v-model="dialog"
      max-width="290"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">WBPPMS</v-card-title>

        <v-card-text>
         {{this.msg}}
        </v-card-text>

        <v-card-actions v-show="this.show_action">
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"

            @click="logout"
          >
            Confirm
          </v-btn>
          <v-btn
            color="red darken-1"

            @click="dialog = false"
          >
            Close
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>

</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        msg:'Are you sure to Sign out ? Please confirm.',
        show_action:true
      }
    },
    methods:{
      logout(){
        this.show_action=false
        this.msg='Logging out from system.........'
        this.$store.dispatch('destroyToken')

        setTimeout(() => {
        this.dialog=false
        this.msg=''
        this.$router.replace("/")
                },2000)
      },
    }
  }
</script>

