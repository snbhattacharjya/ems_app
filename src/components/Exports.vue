<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>

                  <v-flex xs12 sm6 md6 >


                    <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Exports</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-btn flat color="info" :href='urluser' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Office user details</v-btn>
            <v-btn flat color="info" :href='urlpersonnel' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Personnel details</v-btn>
            <!-- <a :href="urluser" tag="span" target="_blank" style="cursor: pointer">Export Office user details</a><br>
            <a :href="urlpersonnel" tag="span" target="_blank" style="cursor: pointer">Export Personnel details</a><br> -->
          </v-card-text>
          <v-card-actions>

          </v-card-actions>
        </v-card>

                  </v-flex>



              </v-layout>

            </v-container>

      </section>
  </div>
</template>

<script>

export default {
  name: 'Exports',
  data () {
    return {
      urlpersonnel: axios.defaults.baseURL+"/export/personnel/"+this.$store.getters.getAccessToken.access_token,
      urluser: axios.defaults.baseURL+"/export/office/"+this.$store.getters.getAccessToken.access_token
    }
  },
  beforeUpdate() {

  },
  computed: {
    getToken:function(){
          return this.$store.getters.getAccessToken
       },
  },
  methods:{

  }

}

</script>

