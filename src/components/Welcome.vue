<template>
  <v-content>
      <section id="home">
        <v-parallax src="http://russiancouncil.ru/common/upload/indel0.jpg" height="600">
          <v-layout
            column
            align-center
            justify-center
            class="white--text"
          >

              <img src="/static/Election_Commission_of_India_Logo.png" alt="avatar">

            <h1 class="white--text mb-2 display-3 text-xs-center font-weight-black">Welcome to PPMS</h1>
            <div class="title mb-3 text-xs-center">A simple way to work with Polling Personnel Data</div>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
             to='/signin'
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
              <h2 class="headline">International Cooperation</h2>
              <span class="subheading">
                Introduction
              </span>
            </div>
          </v-flex>
          <v-flex xs12>
            <v-container grid-list-xl>
              <v-layout row wrap align-center>
                <v-flex xs12 md12>
                  <v-card class="elevation-0 transparent">
                    <v-card-text>
                     <p>It is axiomatic that India, as the largest practising democracy in the world and with over 60 years’ record of holding effective, transparent and credible elections, should play a leading role in promoting participatory democracy and election administration world-wide. There are huge opportunities for democracy promotion and electoral support particularly in the Arab world, Gulf countries, and Central Asian countries, which have still not established thPPMSelves as functional democracies. Further, Election Commission of India has also felt the need to continuously engage itself and others in generating innovative ideas and practices to respond to the emerging challenges in election management. This necessarily calls for bilateral and multilateral cooperation in promoting participatory democracy and best practices in election administration, professional contact and exchange activities, study and observation missions and technical support and advice.</p>
                    <p>Over the last decade, therefore, the Election Commission of India, has been making incremental efforts to promote inter-institutional contacts, and to provide technical support and user-friendly resources and advice to Election authorities elsewhere, on request. In the process, Election Commission of India has also acquired valuable learnings from its counterparts in other countries. This international cooperation outreach has been made in conjunction with India’s foreign policy objectives, to promote democracy and strengthen election administration world-wide.</p>
                    </v-card-text>
                  </v-card>
                </v-flex>

              </v-layout>
            </v-container>
          </v-flex>
        </v-layout>
      </section>

      <section>
        <v-parallax src="http://russiancouncil.ru/common/upload/indel0.jpg" height="380">
          <v-layout column align-center justify-center>
            <div class="headline white--text mb-3 text-xs-center">Memorandum of Understanding</div>
            <em>Election Visitors' Programme</em>
            <v-btn
              class="blue lighten-2 mt-5"
              dark
              large
              to='/signin'
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
                  <div class="headline">Golden Jubilee Celebrations of the ECI</div>
                </v-card-title>
                <v-card-text>
                  <p>During Golden Jubilee Celebrations of the ECI, a number of Election Management Authorities and delegations from participating countries evinced keen interest in the electoral technology including EVM operations in Indian elections, exploring whether the ECI could provide them technical assistance. Nepal, Bhutan and Namibia are now using Electronic Voting Machines manufactured in India. After Election Commission started annual celebrations of its National Voters Day in January 2011, countries such as Pakistan, Bhutan and Republic of Korea have also emulated this practice, and are observing their own National Voters Days to promote voter education and awareness.</p>
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
