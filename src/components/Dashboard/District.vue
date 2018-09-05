<template>

  <v-layout
      column
      align-center
      justify-center
    >
      <v-container fluid>
        <v-layout align-center justify-center>
          <v-flex xs12>
                <div class="ml-3">
                  District Dashboard
                </div>
              </v-flex>
        </v-layout>
      </v-container>
  </v-layout>

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

