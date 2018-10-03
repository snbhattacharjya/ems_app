<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>

                  <v-flex xs12 sm6 md6 >


                    <v-card class="elevation-6">
          <v-toolbar dark color="blue-grey darken-3">
            <v-toolbar-title>Downloads</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <a target="_blank" href="/static/docs/pdf/PP1 FORMAT AS PER ASSEMBLY ELECTION 2016.pdf" tag="span" style="cursor: pointer">PP1 Format</a><br>
            <a target="_blank" href="/static/docs/pdf/PP2-FORMAT-AS PER ELECTION 2016 ASSEMBLY.pdf" tag="span" style="cursor: pointer">PP2 Format</a>
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
  name: 'Downloads',
  data () {
    return {
      drawer: false,
      totalemployee: 0,
    }
  },
  beforeUpdate() {

  },
  computed: {

  },
  methods:{

  }

}
</script>

