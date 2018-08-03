<template>
  <v-app>
    <layout></layout>
    <v-content>
      <router-view/>
    </v-content>


  </v-app>
</template>

<script>
import layout from './components/layouts/Guest'
export default {
  data () {
    return {

    }
  },
  name: 'App',
  components: {
    layout
  }
}
</script>
