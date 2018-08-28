<template>
  <v-app light>


    <v-content>

      <section>
        <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >
            <v-container fluid>
              <v-layout align-center justify-center>
                <v-flex xs12>
                      <div class="white--text ml-3">
                        Developed & Designed by <a class="white--text" href="#" target="_blank">NIC</a>,
                        &copy;  All Rights Reserved 2018
                      </div>
                    </v-flex>
              </v-layout>
            </v-container>
        </v-layout>
      </section>
      <v-footer class="blue darken-2" absolute>
        <v-layout row wrap align-center>
          <v-flex xs12>
            <div class="white--text ml-3">
              Developed & Designed by <a class="white--text" href="#" target="_blank">NIC</a>,
              &copy;  All Rights Reserved 2018
            </div>
          </v-flex>
        </v-layout>
      </v-footer>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'OfficeDashboard',
  data () {
    return {
      drawer: false
    }
  }

}
</script>

