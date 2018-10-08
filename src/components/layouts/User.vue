<template>
  <v-toolbar>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title> <router-link to="/" tag="span" style="cursor: pointer">PPMS</router-link></v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-itPPMS class="hidden-sm-and-down">
      <v-menu :nudge-width="100">
        <v-toolbar-title slot="activator">
          <span>My Account</span>
          <v-icon>arrow_drop_down</v-icon>
        </v-toolbar-title>

        <v-list>
          <v-list-tile
            v-for="item in itPPMS"
            :key="item"
          >
            <v-list-tile-title v-text="item"></v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-itPPMS>
  </v-toolbar>
</template>

<script>
  export default {
    data () {
      return {
        itPPMS: [
          'Profile', 'Change Password', 'Logout'
        ]
      }
    }
  }
</script>

