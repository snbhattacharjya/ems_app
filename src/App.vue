<template>
  <div id="appRoot">
    <template v-if="!$route.meta.public">
      <v-app>
        <!-- <app-drawer></app-drawer> -->
        <app-toolbar></app-toolbar>
        <!-- <v-content class="my-1"> -->
          <v-content>
            <v-slide-y-transition mode="out-in">
              <router-view></router-view>
            </v-slide-y-transition>
            <div class="my-5"></div>
          <!-- App Footer -->

          <v-footer height="auto" class="white pa-3 app--footer" absolute color="primary lighten-1" dark>
            <v-layout row wrap>
              <v-flex xs12 text-xs-center ><strong><v-icon>warning</v-icon> Important :</strong> For security reason this application will logout user if page refresh done manually.</v-flex>

                <span class="caption">Designed & Developped by NIC and Maintained by WBCEO </span>
                <v-spacer></v-spacer>
                <span class="caption"> National Informatics Center All Rights Reserved &copy; {{ new Date().getFullYear() }} </span>

            </v-layout>

          </v-footer>

          </v-content>
        <!-- </v-content> -->
      </v-app>
    </template>
    <template v-else>
      <v-app>
      <Toolbar></Toolbar>
        <transition>
            <router-view></router-view>
        </transition>
        <!-- Public App Footer -->
          <v-footer height="auto" class="white pa-3 app--footer" absolute color="primary lighten-1" dark>
            <span class="caption">Designed & Developped by NIC and Maintained by WBCEO </span>
            <v-spacer></v-spacer>
            <span class="caption mr-1"> National Informatics Center All Rights Reserved &copy; {{ new Date().getFullYear() }} </span>
          </v-footer>
      </v-app>
    </template>

  </div>
</template>

<script>
import Toolbar from './components/layouts/Toolbar.vue' //Public menu
// import AppDrawer from '@/components/layouts/AppDrawer' //Dashboard left menu
import AppToolbar from '@/components/layouts/AppToolbar' //Dashboard top menu

export default {
  data () {
    return {

    }
  },
  name: 'App',
  components: {
    Toolbar,
    // AppDrawer,
    AppToolbar
  },
  methods:{

  },
  beforeUpdate(){
      if(this.getUser.user_id === '' || this.getUser.user_id === 'undefined'){
        this.$router.replace("/")
        }

    },
  computed: {
      getUser:function(){
        return this.$store.getters.getUser
      }
    }
}
</script>
