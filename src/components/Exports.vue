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
            <h1 class="headline mb-3">Comming Soon</h1>
            <p>Service has been disabled/inactive temporarily and it will be OPENED within few days, PLEASE</p>

            <p v-if="this.usercsv == false && this.personnelcsv == false">Sorry Nothing to Export.</p>
             <!-- <download-csv
                        :data="offices_csv"
                        :name="userfilename"
                        :labels="labels"
                        :fields="csvfields"
                >
                <v-btn color="info" :loading="tableloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_user}}</v-btn>

                </download-csv> -->
                <!-- <download-csv
                        :data="personnel_csv"
                        :name="personnelfilename"
                        :labels="personnel_labels"
                        :fields="personnel_csvfields"
                >
                <v-btn color="info" :loading="tableloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_personnel}}</v-btn>
                </download-csv> -->
<!-- <v-btn flat color="info" :href='urluser' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Office user details</v-btn>
            <v-btn flat color="info" :href='urlpersonnel' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Personnel details</v-btn> -->
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
import JsonCSV from 'vue-json-csv'
export default {
  name: 'Exports',
  components: {'download-csv': JsonCSV},
  data () {
    return {
      urlpersonnel: axios.defaults.baseURL+"/export/personnel/"+this.$store.getters.getAccessToken.access_token,
      urluser: axios.defaults.baseURL+"/export/office/"+this.$store.getters.getAccessToken.access_token,
      loader:true,
      tableloading:true,
      offices_csv: [],
      personnel_csv:[],
      userfilename:'Users.csv',
      personnelfilename:'Personnel.csv',
      loadingTXT_user:'Loading....',
      loadingTXT_personnel:'Loading....',
      userscsv:'',
      personnelcsv:'',

        labels: {
          rand_id: 'ID',
          name: 'Name',
          email: 'Email',
          mobile: 'Mobile',
          address: 'Address',
          post_office: 'Post Office',
          pin: 'PIN',
          ps: 'Police Staton',
          blk: 'Block/Municipality',
          subdiv: 'Subdivision',
          rand_password: 'Password'

        },
        personnel_labels: {
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          dob:'Date of Birth',
          email:'Email',
          emp_group:'Employee Group',
          gender: 'Gender',
          grade_pay: 'Grade Pay',
          mobile: 'Mobile',
          name: 'Name',
          office_id:'Office ID',
          pay_level:'Pay Level',
          permanent_address: 'Permanent Address',
          phone: 'Phone',
          post_stat: 'Post Status',
          present_address: 'Present Address',

        },
        csvfields : ['rand_id','name','email','mobile','address','post_office','pin','ps','blk','subdiv','rand_password'],
        personnel_csvfields : ['basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address'],
    }
  },
  beforeUpdate() {

  },
  computed: {
    getToken:function(){
          return this.$store.getters.getAccessToken
       },
  },
   created () {
     var d = new Date();
     var datestring = ("0" + d.getDate()).slice(-2) + "_" + ("0"+(d.getMonth()+1)).slice(-2) + "_" +
    d.getFullYear() + "_" + ("0" + d.getHours()).slice(-2) + "_" + ("0" + d.getMinutes()).slice(-2);

    this.userfilename=this.$store.getters.getUser.district[0]+'_users_'+datestring+'.csv'
    this.personnelfilename=this.$store.getters.getUser.district[0]+'_personnel_'+datestring+'.csv'
      //this.getofficedata()
      //this.getpersonneldata()


    },
  methods:{

      getofficedata () {
        this.tableloading=true
        axios.get('/export/office')
        .then((response, data) => {
          if(response.data.length === 0){
            this.tableloading=false
            this.loadingTXT_user='No Data Found'
            }
         else{
            response.data.forEach(item => {
                this.offices_csv.push(item)
              })
          this.loadingTXT_user='Export Office user details'
         }
            })
        .catch(error => {
          console.log(error)

        })
      },
      getpersonneldata () {

        axios.get('/export/personnel')
        .then((response, data) => {
          if(response.data.length === 0){this.personnelcsv=false}
         else{
            response.data.forEach(item => {
                this.personnel_csv.push(item)
              })
          this.urlpersonnel=true
          this.loader=false

         }
            })
        .catch(error => {
          console.log(error)

        })

      },

  }

}

</script>

