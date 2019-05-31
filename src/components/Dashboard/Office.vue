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

                <v-btn color="info" flat title="Click to reload data" @click="reload" :loading="loading">Reload <v-icon style="cursor:pointer">autorenew</v-icon></v-btn>
                </v-flex>
              </v-layout>
              <v-layout row wrap fill-height v-if="getUser.level != 1">
                  <v-flex  xs12 sm6 md3 >
                    <v-card color="green" class="white--text" fill-height elevation-6 height="150">
                      <v-card-title v-if="getUser.level === 10" primary-title>

                        <h3 class="pb-5">Total EMP as per office : {{getdashboard.officeStuff}}</h3>

                        <h3 class="">Total EMP Registered : {{getdashboard.totalemployee}}</h3>
                      </v-card-title>
                      <v-card-title v-else  primary-title>

                        <h3 class="pb-5">Total NO. of Office : {{getdashboard.totalOffice}}</h3>

                        <h3 class="">Total Office Registered so far : {{getdashboard.distinct_office}}</h3>
                      </v-card-title>

                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="cyan darken-2" class="white--text" fill-height elevation-6 height="150">
                      <v-card-title primary-title>
                        <i class="material-icons">perm_identity</i>
                        <h3 >Total Male Registered</h3>
                      </v-card-title><br><br>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalMale==null ? 0 : getdashboard.totalMale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="blue" class="white--text" fill-height elevation-6 height="150">
                      <v-card-title primary-title>
                        <i class="material-icons">face</i>
                        <h3>Total Female Registered</h3>
                      </v-card-title><br><br>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{getdashboard.totalfemale==null ? 0 : getdashboard.totalfemale}}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs12 sm6 md3 >
                    <v-card color="blue-grey" class="white--text" fill-height elevation-6 height="150">
                      <v-card-title primary-title>
                        <i class="material-icons">people_outline</i>
                        <h3>Total Employee Registered</h3>
                      </v-card-title>
                      <v-divider></v-divider>

                      <v-card-actions><v-spacer></v-spacer><h1>{{ getdashboard.totalemployee  }}</h1></v-card-actions>
                    </v-card>
                  </v-flex>

              </v-layout>
              <v-layout row wrap>

                  <v-card-title primary-title class="layout"><div class="headline">Welcome to WBPPMS</div></v-card-title>
                  <v-card-text><v-divider class="my-3"></v-divider>West Bengal CEO's PP Portal.
                  <!-- <v-btn  color="info" :to="'/sendsms'">SMS</v-btn> -->
                  </v-card-text>
              </v-layout>
            </v-container>
<v-dialog
      v-model="dialog"
      max-width="460"
      persistent=true
    >
      <v-card>
        <v-card-title class="headline">Important Notice !!</v-card-title>

        <v-card-text v-if="this.title!=''">
        <strong class="green--text">{{this.title}}</strong><br><br>
        <span v-html="this.notice"></span>
        </v-card-text>
        <v-card-text v-else class="text-xs-center">
          <v-progress-circular indeterminate  color="primary"></v-progress-circular>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="red darken-1"
            flat="flat"
            @click="close_notice"
          >
            Close
          </v-btn>


        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialog: false,
      title:'',
      notice:'',
      loading:false,

    }
  },
  beforeUpdate() {

  },
  computed: {
    getdashboard:function(){
      return this.$store.getters.getDashboard
    },
    calculateTotalEmployee:function(){
      return parseInt(this.getdashboard.totalMale) + parseInt(this.getdashboard.totalfemale)
    },
    getUser:function(){
      return this.$store.getters.getUser
    }
  },
  methods:{
    close_notice:function(){
      this.dialog = false
      this.$cookies.set('read_notice',true);
    },
    get_notice:function(){
        axios.get('/getnotice')
        .then((response, data) => {
            this.notice=response.data.notice,
            this.title=response.data.title
        })
        .catch(error => {
          console.log(error)
        })
      },
      reload:function(){
        this.loading=true
         axios.post('/dashboarddata')
        .then((response, data) => {
            this.$store.dispatch('storeDashboard', response.data)
        })
        .catch(error => {
          console.log(error)
        })
        this.loading=false
      },
  },
  created(){
      this.get_notice()
      if(!this.$cookies.isKey("read_notice") && this.$cookies.get("read_notice")!=true )
      this.dialog=true

  }

}
</script>
