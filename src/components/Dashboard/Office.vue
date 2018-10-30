<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap>
              <v-flex xs12 class="blue--text">
                <v-layout row wrap>
                  <v-flex xs2><h2>WELCOME : </h2></v-flex>
                  <v-flex xs10 mt-1><h3>{{ getUser.name }}</h3></v-flex>

                </v-layout>
                <v-divider class="my-3 xs12"></v-divider>
                </v-flex>
              </v-layout>
              <v-layout row wrap fill-height>
                  <v-flex  xs12 sm6 md3 >
                    <v-card color="green" class="white--text" fill-height elevation-6>
                      <v-card-title v-if="getUser.level === 10" primary-title>

                        <h3 class="pb-4">Total EMP as per office : {{getdashboard.officeStuff}}</h3>

                        <h3 class="">Total EMP Registered : {{getdashboard.totalemployee}}</h3>
                      </v-card-title>
                      <v-card-title v-else  primary-title>

                        <h3 class="pb-4">Total Office : {{getdashboard.totalOffice}}</h3>

                        <h3 class="">Office Registered : {{getdashboard.distinct_office}}</h3>
                      </v-card-title>

                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="cyan darken-2" class="white--text" fill-height elevation-6>
                      <v-card-title primary-title>
                        <i class="material-icons">perm_identity</i>
                        <h3 >Total Male Registerd</h3>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalMale==null ? 0 : getdashboard.totalMale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="blue" class="white--text" fill-height elevation-6>
                      <v-card-title primary-title>
                        <i class="material-icons">face</i>
                        <h3>Total Female Registerd</h3>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalfemale==null ? 0 : getdashboard.totalfemale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="blue-grey" class="white--text" fill-height elevation-6>
                      <v-card-title primary-title>
                        <i class="material-icons">people_outline</i>
                        <h3>Total Employee Registerd</h3>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{ getdashboard.totalemployee  }}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

              </v-layout>
              <v-layout row wrap>
                  <v-card-title primary-title class="layout"><div class="headline">Welcome to PPMS</div></v-card-title>
                  <v-card-text><v-divider class="my-3"></v-divider>A simple way to work with Polling Personnel Data.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</v-card-text>
              </v-layout>
            </v-container>

      </section>
  </div>
</template>

<script>

export default {
  name: 'OfficeDashboard',
  data () {
    return {
      drawer: false,
      totalemployee: 0,
    }
  },
  beforeUpdate() {
    //this.totalemployee= this.getdashboard.totalMale + this.getDashboard.totalfemale
  },
  computed: {
    getdashboard:function(){
      return this.$store.getters.getDashboard
    },
    calculateTotalEmployee:function(){
      return this.getdashboard.totalMale + this.getDashboard.totalfemale
    },
    getUser:function(){
      return this.$store.getters.getUser
    }
  },
  methods:{

  }

}
</script>

