<template>
  <v-toolbar color="primary">
    <v-toolbar-title>
    <router-link to="/" tag="span" style="cursor: pointer">
    <v-avatar  :tile="true" color="grey lighten-4"><img src="/static/Election_Commission_of_India_Logo.png" alt="avatar"></v-avatar></router-link>
    <router-link to="/" tag="span" style="cursor: pointer">EMS</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='/' v-scroll-to="'#home'">Home</v-btn>
      <v-btn flat to='/#features' v-scroll-to="'#feature'">Features</v-btn>
      <v-btn flat to='/#services' v-scroll-to="'#services'">Services</v-btn>
      <v-btn flat to='/signin'>Sign In</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

