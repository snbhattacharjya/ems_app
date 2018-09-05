<template>
  <v-toolbar color="grey lighten-5">
    <v-toolbar-title>
    <router-link to="/" tag="span" style="cursor: pointer">
    <v-avatar
      color="grey lighten-5"
      :tile="true"
    >
      <img src="/static/national20emblem.jpg" alt="avatar">
    </v-avatar></router-link>
    <router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black blue--text text--darken-4">EMS</router-link>
    <span class="caption">(Election Management System)</span></v-toolbar-title>
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

