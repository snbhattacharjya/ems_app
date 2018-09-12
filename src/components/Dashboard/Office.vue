<template>
  <div id="pageDashboard">
      <section>
            <v-container grid-list-md align-center>
              <v-layout row wrap fill-height>

                  <v-flex xs3>
                    <v-card color="pink" class="white--text">
                      <v-card-title primary-title>
                        <i class="material-icons">business</i>
                        <div class="headline pb-5">As per Office PP1</div>

                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalOffice}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs3>
                    <v-card color="cyan darken-2" class="white--text">
                      <v-card-title primary-title>
                        <i class="material-icons">perm_identity</i>
                        <h1 class="pb-4">Total Male Registerd</h1>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalMale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs3>
                    <v-card color="purple" class="white--text">
                      <v-card-title primary-title>
                        <i class="material-icons">face</i>
                        <h1>Total Female Registerd</h1>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalfemale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs3>
                    <v-card color="blue-grey" class="white--text">
                      <v-card-title primary-title>
                        <i class="material-icons">people_outline</i>
                        <h1>Total Employee Registerd</h1>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{ getdashboard.totalemployee  }}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

              </v-layout>
              <v-layout row wrap>
                  <v-card-title primary-title class="layout"><div class="headline">Welcome to EMS</div></v-card-title>
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
    }
  },
  methods:{

  }

}
</script>

