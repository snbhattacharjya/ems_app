<template>
  <v-app>
    <guest v-if="!loggedIn"></guest>
    <user v-else></user>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import guest from './components/layouts/Guest'
import user from './components/layouts/User'
export default {
  data () {
    return {
      loggedIn: false
    }
  },
  name: 'App',
  components: {
    guest,
    user
  },
  computed: {
    loggedIn(){
      this.loggedIn = true
    }
  }
}
</script>
