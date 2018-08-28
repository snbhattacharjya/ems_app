<template>
  <v-toolbar :clipped-left="true" app color="warning">
    <v-toolbar-side-icon ></v-toolbar-side-icon>
    <v-toolbar-title> <v-avatar  :tile="true" color="grey lighten-4">
          <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">
        </v-avatar><router-link to="/" tag="span" style="cursor: pointer">EMS</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='' v-on:click="window.getApp.$emit('APP_LOGOUT')">Sign Out</v-btn>
      <v-btn flat to='/user/profile'>Profile</v-btn>
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

