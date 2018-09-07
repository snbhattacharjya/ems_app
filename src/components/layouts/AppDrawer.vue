<template>
  <v-navigation-drawer class="grey lighten-3" :clipped="true" app>
  <v-divider></v-divider>

  <v-list dense class="pt-1">

      <template v-for="item in menus">

       <v-list-group v-if="item.submenu" :key="item.menu_name" :group="item.group" :prepend-icon="item.menu_icon_name" no-action="no-action">
        <v-list-tile slot="activator">
          <v-list-tile-title>{{item.menu_name}}</v-list-tile-title>
        </v-list-tile>
          <v-list-tile v-for="subItem in item.submenu" :key="subItem.menu_name" :to="subItem.menu_link"> <v-list-tile-action>
              <v-icon v-text="subItem.menu_icon_name"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="subItem.menu_name"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :to="item.menu_link"  ripple="ripple"  rel="noopener" :key="item.parent_menu">
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
  export default {
    data () {
      return {
        menus:[],
        right: null,
        district_items:[
        {
          parent_menu: 'Dashboard',
          group: 'dashboard',
          menu_icon_name: 'dashboard',
          menu_link: '/dashboard'
        },
        {
          parent_menu: 'About',
          group: 'help',
          menu_icon_name: 'help',
          menu_link: '/dashboard/help'
        },
        {
          menu_name: 'User',
          group: 'user',
          menu_icon_name: 'people',
          submenu: [
            { menu_name: 'Create new user', menu_icon_name: 'create', menu_link:'/users/create' }

          ]
        },
        {
          menu_name: 'Office',
          group: 'office',
          menu_icon_name: 'business',
          submenu: [
            { menu_name: 'Create new office', menu_icon_name: 'create', menu_link:'/office/create' },
            { menu_name: 'Office Lists', menu_icon_name: 'list_alt', menu_link:'/office/list' }

          ]
        },
        {
          menu_name: 'Personnel',
          group: 'personnel',
          menu_icon_name: 'people',
          submenu: [
            { menu_name: 'Create new personnel', menu_icon_name: 'create', menu_link:'/personnel/create' },
            { menu_name: 'Personnel Lists', menu_icon_name: 'list_alt', menu_link:'/personnel/list' }

          ]
        }
        ],
        office_items:[
        {
          parent_menu: 'Dashboard',
          group: 'dashboard',
          menu_icon_name: 'dashboard',
          menu_link: '/dashboard/'
        },
        {
          parent_menu: 'About',
          group: 'help',
          menu_icon_name: 'help',
          menu_link: '/dashboard/help'
        },
        {
          menu_name: 'Office',
          group: 'office',
          menu_icon_name: 'business',
          submenu: [
            { menu_name: 'Edit Office', menu_icon_name: 'create', menu_link:'/office/edit' },

          ]
        },
        {
          menu_name: 'Personnel',
          group: 'personnel',
          menu_icon_name: 'people',
          submenu: [
            { menu_name: 'Create new personnel', menu_icon_name: 'create', menu_link:'/personnel/create' },
            { menu_name: 'Personnel Lists', menu_icon_name: 'list_alt', menu_link:'/personnel/list' }

          ]
        }
        ],
      }
    },
    created(){
       this.loadmenu
    },
    computed: {
      loadmenu:function(){
        console.log('User level - '+this.getuser.level)
        if(this.getuser.level === 3){
          this.district_items.forEach(item => {
            return this.menus.push(item)
          })
        }else if(this.getuser.level === 10){
          this.office_items.forEach(item => {
           return this.menus.push(item)
          })
        }
      },
       getuser:function(){
          return this.$store.getters.getUser
       }
    },
    methods:{

    }
  }
</script>
