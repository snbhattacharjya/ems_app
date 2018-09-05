<template>
  <div>
    <v-toolbar :clipped-left="true" color="primary" app dark>
      <v-toolbar-side-icon ></v-toolbar-side-icon>
      <v-toolbar-title> <v-avatar color="primary">
            <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">
          </v-avatar><router-link to="/" tag="span" style="cursor: pointer" class="ml-2 headline font-weight-black">EMS</router-link></v-toolbar-title>
      <v-spacer></v-spacer>

        Welcome {{getUserName}}
        <v-menu bottom left>

            <v-btn
              slot="activator"
              dark
              icon
            >
              <v-icon>more_vert</v-icon>
            </v-btn>

            <v-list>
              <v-list-tile
                v-for="(item, i) in items"
                :key="i"
                :to="item.path"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-icon @click="logout">exit_to_app</v-icon>

    </v-toolbar>
    <app-drawer></app-drawer>
  </div>
</template>

<script>
import AppDrawer from '@/components/layouts/AppDrawer'
  export default {
    data () {
      return {
        username: '',
        items: [
          {title: 'Profile', path: '/user/profile'}
        ]

      }
    },
    computed: {
      getUserName(){
        return this.$store.getters.getUserName
      }
    },
    components: {
      AppDrawer,
    },
    methods: {
      logout(){
        this.$store.dispatch('destroyToken')
        this.$router.replace("/")
      }
    }
  }
</script>

