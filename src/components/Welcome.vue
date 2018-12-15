<template>
  <v-content>
      <section id="home">
        <v-parallax src="/static/voter2.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >

              <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">

            <h1 class="mb-2 display-3 text-xs-center font-weight-black">Welcome to WBPPMS</h1>
            <div class="title mb-3 text-xs-center">A simple way to work with Polling Personnel Data</div>
            <v-btn v-if="!this.$store.getters.getAccessToken.access_token"
              class="blue lighten-2 mt-5"
              dark
              large
             to='/signin'
            >
              Get Started
            </v-btn>
            <v-btn v-else
              class="blue lighten-2 mt-5"
              dark
              large
             to='/dashboard'
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section id="feature">
        <v-layout
          column
          wrap
          class="my-5"
          align-center
        >
          <v-flex xs12 sm4 class="my-3">
            <div class="text-xs-center">
              <h2 class="headline">Welcome to WBPPMS</h2>

            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md12>
                  <v-card class="elevation-0 transparent">
                    <v-card-text>
                     <h1 class="mb-2 display-3 text-xs-center font-weight-black">Welcome to WBPPMS</h1>
            <div class="title mb-3 text-xs-center">A simple way to work with Polling Personnel Data</div>
                    </v-card-text>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="/static/voter2.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline  mb-3 text-xs-center">Welcome to WBPPMS</div>
            <v-btn v-if="!this.$store.getters.getAccessToken.access_token"
              class="blue lighten-2 mt-5"
              dark
              large
             to='/signin'
            >
              Get Started
            </v-btn>
            <v-btn v-else
              class="blue lighten-2 mt-5"
              dark
              large
             to='/dashboard'
            >
              Get Started
            </v-btn>
          </v-layout>
        </v-parallax>
      </section>

      <section id="services">
        <v-container grid-list-xl>
          <v-layout row wrap justify-center class="my-5">
            <v-flex xs12 sm12>
              <v-card class="elevation-0 transparent">
                <v-card-title primary-title class="layout justify-center">
                  <div class="headline">Welcome to WBPPMS</div>
                </v-card-title>
                <v-card-text>
                  <h1 class="mb-2 display-3 text-xs-center font-weight-black">Welcome to WBPPMS</h1>
            <div class="title mb-3 text-xs-center">A simple way to work with Polling Personnel Data</div>
                </v-card-text>
              </v-card>
            </v-flex>

          </v-layout>
        </v-container>
      </section>
</v-content>


</template>

<script>
  export default {

  }
</script>
