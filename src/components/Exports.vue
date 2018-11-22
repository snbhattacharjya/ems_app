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
            <a :href="url" tag="span" target="_blank" style="cursor: pointer">Export Office user details</a><br>
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

      url: axios.defaults.baseURL+"/export/office/"+this.$store.getters.getAccessToken.access_token
    }
  },
  beforeUpdate() {
   this.url+=this.$store.getters.getAccessToken
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

