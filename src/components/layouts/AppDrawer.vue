<template>
 <v-navigation-drawer class="grey lighten-3"  :clipped="true" app v-model="drawer" :width="300">
    <v-divider></v-divider>
    <v-list dense class="pt-1">
      <template v-for="item in menus">
       <v-list-group v-if="item.submenu !== 'null'" :key="item.parent_menu" :group="item.group" :prepend-icon="item.menu_icon_name" no-action="no-action">
        <v-list-tile slot="activator">
          <v-list-tile-title>{{item.parent_menu}}</v-list-tile-title>
        </v-list-tile>
          <v-list-tile v-for="subItem in item.submenu" :key="subItem.menu_name" :to="subItem.menu_link"> <v-list-tile-action>
              <v-icon v-text="subItem.menu_icon_name"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="subItem.menu_name"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else-if="item.menu_target !='external'" :to="item.menu_link"  ripple="ripple"  rel="noopener" :key="item.parent_menu" target="_blank">
        <v-list-tile-action>
          <v-icon>{{ item.menu_icon_name }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.parent_menu }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile v-else :href="item.menu_link"  ripple="ripple"  rel="noopener" :key="item.parent_menu" >
        <v-list-tile-action>
          <v-icon>{{ item.menu_icon_name }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.parent_menu }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      </template>

    </v-list>

  </v-navigation-drawer>
</template>
<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  export default {
    components: {
    VuePerfectScrollbar
    },
    data () {
      return {
        menus:[],
        mode:null,
        props:{
          mode: {
            type: Boolean,
            required: false
          }
        },
        settings: {
        maxScrollbarLength: 60
      }

      }
    },
    mounted(){

    },
    beforeUpdate(){
        this.loadmenu()
    },
    computed: {
      loadmenu:function(){
        this.getmenu.forEach(item => {
           this.menus.push(item)
          })
      },
       getuser:function(){
          return this.$store.getters.getUser
       },
       getmenu:function(){
          return this.$store.getters.getMenu
       }
    },
    methods:{
      scrollHanle(evt) {
      console.log(evt)
    },

    }
  }
</script>
<style scoped>
.scroll-area {
  position: relative;
  margin: auto;
  width: 400px;
  height: 300px;
}
</style>

