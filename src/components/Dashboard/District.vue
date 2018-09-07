<template>
  <v-app light>


    <v-content>

      <section>
        <v-layout
            column
            align-center
            justify-center
            class=""
          >
            <v-container fluid>
              <v-layout align-center justify-center>
                <v-flex xs12>
                      <div class=" ml-3">
                        Developed & Designed by <a class="" href="#" target="_blank">NIC</a>,
                        &copy;  All Rights Reserved 2018
                      </div>
                    </v-flex>
              </v-layout>
            </v-container>
        </v-layout>
      </section>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'DistrictDashboard',
  data () {
    return {
      drawer: false
    }
  }

}
</script>

