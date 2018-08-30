<template>
  <div>

  <v-toolbar :clipped-left="true" color="primary" app dark>
    <v-toolbar-side-icon ></v-toolbar-side-icon>
    <v-toolbar-title> <v-avatar  :tile="true" color="primary">
          <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">
        </v-avatar><router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black">EMS</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='' v-on:click="logout">Sign Out</v-btn>
      <v-btn flat to='/user/profile'>Profile</v-btn>
    </v-toolbar-items>
  </v-toolbar>
  <app-drawer></app-drawer>
  </div>
</template>

<script>
import AppDrawer from '@/components/layouts/AppDrawer'
  export default {
    data () {
      return {

      }
    },
    components: {
      AppDrawer,
    },
    methods: {
      logout(){
        this.$router.replace("/")
      }
    }
  }
</script>

