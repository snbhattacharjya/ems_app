<template>
  <v-toolbar>
    <v-toolbar-title> <router-link to="/" tag="span" style="cursor: pointer">PPMS</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to='/signin'>Sign In</v-btn>
      <v-btn flat to='/signup'>Sign Up</v-btn>
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

