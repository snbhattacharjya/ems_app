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
                        <!--<h1 class="headline mb-3">Comming Soon</h1>
                        <p>Service has been disabled/inactive temporarily and it will be OPENED within few days, PLEASE</p>

                        <p v-if="this.usercsv == false && this.personnelcsv == false">Sorry Nothing to Export.</p>-->
                        <download-csv
                                    :data="offices_csv"
                                    :name="userfilename"
                                    :labels="labels"
                                    :fields="csvfields"
                            >
                            <v-btn color="info" :loading="officeloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT_user}}</v-btn>

                            </download-csv>
                            <download-csv
                                    :data="personnel_csv"
                                    :name="personnelfilename"
                                    :labels="personnel_labels"
                                    :fields="personnel_csvfields"
                            >
                            <v-btn color="info" :loading="personnelloading" class="button"><v-icon>receipt</v-icon>Export Personnel data as CSV</v-btn>
                            </download-csv>
                        <!-- <v-btn flat color="info" :href='urluser' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Office user details</v-btn>-->
                        <!-- <v-btn flat color="info" :href='urlpersonnel' target="_blank" style="cursor: pointer"><v-icon color="info">assignment_returned</v-icon> Export Personnel details</v-btn>
                      -->

                      </v-card-text>
                      <v-card-actions>

                      </v-card-actions>
                    </v-card>

                  </v-flex>

                   <v-flex xs12 sm6 md6 >


                    <v-card class="elevation-6">
                      <v-toolbar dark color="blue-grey darken-3">
                        <v-toolbar-title>Checklist</v-toolbar-title>
                      </v-toolbar>
                      <v-card-text>

                        <block-muni-list v-model="block_muni_id"></block-muni-list><v-btn color="primary"  @click="getpersonneldatabyblock" >Generate Checklist</v-btn>

              <download-csv
                        :data="personnel_block_csv"
                        name="Checklist.csv"
                        :labels="personnel_block_labels"
                        :fields="personnel_block_cvsfields"
                >
                <v-btn color="info" :loading="personnelblockloading" :disable="disable_block_csv" class="button"><v-icon>receipt</v-icon>Export checklist as CSV</v-btn>
                </download-csv>


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
import BlockMuniList from '@/components/BlockMuniList'
export default {
  name: 'Exports',
  components: {'download-csv': JsonCSV,'block-muni-list': BlockMuniList,},
  data () {
    return {
      urlpersonnel: axios.defaults.baseURL+"/export/personnel/"+this.$store.getters.getAccessToken.access_token,
      urluser: axios.defaults.baseURL+"/export/office/"+this.$store.getters.getAccessToken.access_token,
      loader:true,
      officeloading:false,
      personnelloading:false,
      personnelblockloading:false,
      disable_block_csv:true,
      personnel_block_csv_name:'Checklist.csv',
      offices_csv: [],
      personnel_csv:[],
      personnel_block_csv:[],
      userfilename:'Users.csv',
      personnelfilename:'Personnel.csv',
      loadingTXT_user:'Loading....',
      loadingTXT_personnel:'Loading....',
      userscsv:'',
      personnelcsv:'',

        labels: {
          id:"Office ID",
          name:"Name",
          email:"Email",
          phone:"Phone",
          mobile:"Mobile",
          identification_code:"Identification Code",
          address:"Address",
          post_office:"Post Office",
          pin:"PIN",
          ac_id:"Assembly Constituency ID",
          pc_id:"Parliamentary Constituency ID",
          subdivision_id:"Subdivision ID",
          block_muni_id:"Block/Municipality ID",
          police_station_id:"Police Station ID",
          category_id:"Office Category ID",
          institute_id:"Institute ID",
          created_at: 'Created At',
          updated_at: 'Updated At'

        },
        personnel_labels: {
          id:'Personnel ID',
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
          qualification_id: 'Qualification',
          language_id:'Language',
          epic:'EPIC',
          part_no:'Part No',
          sl_no:'Serial No',
          assembly_temp_id:'Temporary Assembly',
          assembly_perm_id:'Permanent Assembly',
          assembly_off_id:'Office Assembly',
          block_muni_temp_id:'Temporary Block/Municipality',
          block_muni_perm_id:'Permanent Block/Municipality',
          block_muni_off_id:'Office Block/Municipality',
          subdivision_id:'Subdivision',
          branch_ifsc:'IFSC',
          bank_account_no:'Bank Account No',
          remark_id:'Remark',
          remark_reason:'Remark Reason',
          exempted:'Exempted',
          exemp_reason:'Reasone of Exemption',
          exemp_date:'Date of Exemption',
          created_at: 'Created At',
          updated_at: 'Updated At'
        },
        personnel_block_labels: {
          id:'Personnel ID',
          basic_pay: 'Basic Pay',
          designation: 'Designation',
          dob:'Date of Birth',
          email:'Email',
          emp_group:'Employee Group',
          gender: 'Gender',
          scale: 'Pay Scale',
          grade_pay: 'Grade Pay',
          pay_level: 'Pay Level',
          mobile: 'Mobile',
          name: 'Name',
          office_id:'Office ID',
          officename:'Office Name',
          office_address: "Office Address",
          office_pin: "Office PIN",
          office_post_office: "Post Office(Office)",
          policestations: "Police Station(Office)",
          pay_level:'Pay Level',
          permanent_address: 'Permanent Address',
          phone: 'Phone',
          post_stat: 'Post Status',
          present_address: 'Present Address',
          qualification: 'Qualification',
          languages:'Language',
          epic:'EPIC',
          part_no:'Part No',
          sl_no:'Serial No',
          tempac:'Temporary Assembly',
          pertac:'Permanent Assembly',
          offac:'Office Assembly',
          tempblock:'Temporary Block/Municipality',
          permblock:'Permanent Block/Municipality',
          offblock:'Office Block/Municipality',
          subdivision_id:'Subdivision',
          branch_ifsc:'IFSC',
          bank_account_no:'Bank Account No',
          post_office_account: 'Post Office Account',
          remark:'Remark',
          remark_reason:'Remark Reason',
          exempted:'Exempted',
          exemp_reason:'Reasone of Exemption',
          exemp_date:'Date of Exemption'
        },
        block_muni_id:'',
        csvfields : ['id','name','email','phone','mobile','identification_code',
        'address','post_office','pin','ac_id','pc_id','subdivision_id','block_muni_id','police_station_id',
        'category_id','institute_id','created_at','updated_at'],
        personnel_csvfields : ['id','basic_pay','designation','dob','email','emp_group','gender','grade_pay','mobile','name','office_id','pay_level','permanent_address','phone','post_stat','present_address','qualification_id','language_id','epic','part_no','sl_no','assembly_temp_id','assembly_perm_id','assembly_off_id','block_muni_temp_id','block_muni_perm_id','block_muni_off_id','subdivision_id','branch_ifsc','bank_account_no','remark_id','remark_reason','exempted','exemp_reason','exemp_date','created_at','updated_at'],
        personnel_block_cvsfields:['id','basic_pay','designation','dob','email','emp_group','gender','scale','grade_pay','pay_level','mobile','name','office_id','officename','office_address','office_pin','office_post_office','policestations','pay_level','permanent_address','phone','post_stat','present_address','qualification','languages','epic','part_no','sl_no','tempac','pertac','offac','tempblock','permblock','offblock','subdivision_id','branch_ifsc','bank_account_no','post_office_account','remark','remark_reason','exempted','exemp_reason','exemp_date'],
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
    this.getofficedata()
      this.getpersonneldata()


    },
  methods:{

      getofficedata () {
        this.officeloading=true
        axios.get('/exportoffice')
        .then((response, data) => {
          if(response.data.length === 0){
            this.officeloading=false
            this.loadingTXT_user='No Data Found'
            }
         else{
            response.data.forEach(item => {
                this.offices_csv.push(item)
              })
          this.officeloading=false
          this.loadingTXT_user='Export Office user details as CSV'
         }
            })
        .catch(error => {
          console.log(error)
          this.officeloading=false
          this.loadingTXT_user='Error fetching data'
        })
      },
      getpersonneldata () {
         this.personnelloading=true
        axios.get('/personnelExport')
        .then((response, data) => {
          if(response.data.length === 0){
            this.personnelcsv=false
            this.personnelloading=false
            }
         else{
            response.data.forEach(item => {
                this.personnel_csv.push(item)
              })
           this.personnelloading=false

         }
            })
        .catch(error => {
          console.log(error)
          this.personnelloading=false
        })

      },
      getpersonneldatabyblock () {
        this.disable_block_csv=true
        this.personnel_block_csv=[]
         this.personnelblockloading=true
        axios.get('/blockwiseofficepersonel/'+this.block_muni_id)
        .then((response, data) => {
          if(response.data['blockWiseOfficePersonnel'].length === 0){
            this.personnelblockloading=false
            }
         else{
           this.disable_block_csv=false
            response.data['blockWiseOfficePersonnel'].forEach(item => {
                this.personnel_block_csv.push(item)
              })
              this.personnel_block_csv_name=
           this.personnelblockloading=false

         }
            })
        .catch(error => {
          console.log(error)
          this.personnelblockloading=false
        })

      },
  }

}

</script>

