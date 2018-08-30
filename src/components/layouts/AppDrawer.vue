<template>
  <v-navigation-drawer class="grey lighten-3" :clipped="true" app>
  <v-divider></v-divider>
    <v-list dense class="pt-1">
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        :to="item.link"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>

        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
       <v-list-group
        prepend-icon="business"
        value="true"
      >
        <v-list-tile slot="activator">
          <v-list-tile-title>Offices</v-list-tile-title>
        </v-list-tile>
          <v-list-tile
            v-for="office in offices"
            :key="office.title"
            :to="office.link"
          > <v-list-tile-action>
              <v-icon v-text="office.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="office.title"></v-list-tile-title>

          </v-list-tile>
          <v-list-tile
            v-for="personnel in personnel"
            :key="personnel.title"
            :to="personnel.link"
          > <v-list-tile-action>
              <v-icon v-text="personnel.icon"></v-icon>
            </v-list-tile-action>
            <v-list-tile-title v-text="personnel.title"></v-list-tile-title>
          </v-list-tile>
        </v-list-group>
    </v-list>

  </v-navigation-drawer>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Dashboard', icon: 'dashboard', link:'/dashboard/office' },
          { title: 'About', icon: 'help', link:'/office/help' }
        ],
        offices: [
          { title: 'Office Lists', icon: 'view_list', link:'/office/list' },
          { title: 'Create new office', icon: 'create', link:'/office/create' }
        ],
         personnel: [
          { title: 'Personnel Lists', icon: 'view_list', link:'/personnel/list' },
          { title: 'Create new personnel', icon: 'create', link:'/personnel/create' }
        ],
        right: null
      }
    }
  }
</script>
