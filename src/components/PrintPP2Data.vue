<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
        <v-flex xs11><h1 class="headline" >PP2 Report As On {{ new Date().toLocaleDateString('en-GB') }}<br>{{ getuser.name }}({{getuser.user_id}})</h1></v-flex><v-flex xs1><v-btn v-if="this.agree" fab dark small color="primary" id="printbtn" onclick="printJS({ printable: 'report', type: 'html',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','agree']  })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-3">
            <h1 class="headline mb-3 blue--text">Check List :

            </h1>
            <v-flex xs12 id="agree" v-if="parseInt(this.getdashboard.totalemployee)== parseInt(this.getdashboard.officeStuff)">
              <v-checkbox  :label="agree_text"  v-model="agree" :value="agree" color="success" v-validate="'required'"
                :error-messages="errors.collect('agree')"
                data-vv-name="agree" @change="agree_with_pp2"></v-checkbox>
              </v-flex>
            <!-- <v-flex xs12 v-else>
              <p>Checklist will appear only after PP2 Entry is complete</p>
            </v-flex> -->
            <!-- <p>Service has been disabled/inactive temporarily and it will be OPENED within few days, PLEASE</p> -->
            <!-- <download-csv
                        :data="reports"
                        :name="dataFile"
                        :labels="labels"
                        :fields="csvfields"

                >
                    <v-btn color="info" :loading="tableloading" class="button"><v-icon>receipt</v-icon>{{this.loadingTXT}}</v-btn>
                </download-csv> -->
            <v-layout row wrap >
              <table v-if="this.agree" class="v-datatable v-table dark mb-5" style=""  border=1>
              <tbody>
                <tr v-if="tableloading"><td><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
              <tr v-for="report in reports" :prop="report" :key="report.office_id">
              <td>
                <v-layout row wrap class="my-2">
                  <v-flex xs12>
                    <strong>{{report.sl}} ) </strong>
                    <strong>Name : </strong>{{report.empname}} <strong>Designation : </strong>{{report.designation}}
                    <strong>Present Address : </strong>{{report.present_address}} <strong>Permanent Address : </strong>{{report.permanent_address}}
                    <strong>Date of Birth : </strong>{{moment(report.dob).format('DD/MM/YYYY')}} <strong>Gender : </strong>{{report.gender}}
                    <strong>Pay Scale : </strong>{{report.scale}} <strong>Basic Pay : </strong>{{report.basic_pay}} <strong>Grade Pay : </strong>{{report.grade_pay}} <strong>Pay Level : </strong>{{report.pay_level}}
                    <strong>Employee Group : </strong>{{report.emp_group}} <strong>Working Status : </strong>{{report.working_status}} <strong>Email : </strong>{{report.email}} <strong>Phone : </strong>{{report.phone}} <strong>Mobile : </strong>{{report.mobile}}
                    <strong>Epic No : </strong>{{report.epic}} <strong>Part No : </strong>{{report.part_no}} <strong>Serial No : </strong>{{report.sl_no}} <strong>Post Status : </strong>******
                    <strong>Qualification : </strong>{{report.qualification}} <strong>Bank AC Number : </strong>{{report.bank_account_no}} <strong>Branch IFSC Number : </strong>{{report.branch_ifsc}}
                    <strong>Subdivision : </strong>{{report.subdivision}} <strong>Temporary Assembly Constituency : </strong>{{report.actemp}} <strong>Permanent Assembly Constituency : </strong>{{report.acpermanent}} <strong>Office Assembly Constituency : </strong>{{report.acofficename}}
                    <strong>Remark : </strong>{{report.remark}}
                  </v-flex>
                </v-layout>
              </td>
              </tr>
              </tbody>
              </table>
            </v-layout>
          </v-flex>

        </v-layout>
      </section>
    </v-container>

  </div>

</template>




<script>
import JsonCSV from 'vue-json-csv'
export default {
  name: 'PrintPP2Data',
  components: {'download-csv': JsonCSV},
  data(){
    return {
      reports:[],
      search: '',
      loadingTXT:'Loading....',
      tableloading:false,
      dataFile: 'pp2_data_export.csv',
        labels: {
          office_id:'Office ID',
          id:'Personnel ID',
          empname: 'Name',
          designation:'Designation',
          present_address:'Present Address',
          permanent_address:'Permanent Address',
          dob:'Date of Birth',
          gender:'Gender',
          scale: 'Pay Scale',
          basic_pay:'Basic Pay',
          grade_pay: 'Grade Pay',
          pay_level: 'Pay Level',
          emp_group: 'Employee Group',
          working_status: 'Working Status',
          email:'Email',
          phone:'Phone',
          mobile:'Mobile',
          epic:'Epic No',
          part_no: 'Part No',
          sl_no: 'Serial No',
          post_stat: 'Post Status',
          qualification: 'Qualification',
          bank_account_no: 'Bank AC Number',
          branch_ifsc: 'Branch IFSC Number',
          subdivision: 'Subdivision',
          actemp: 'Temporary Assembly Constituency',
          acpermanent: 'Permanent Assembly Constituency',
          acofficename: 'Office Assembly Constituency',
          remark: 'Remark'
        },
        csvfields : ['office_id','id','empname','designation','present_address','permanent_address','dob','gender','scale','basic_pay','grade_pay','pay_level','emp_group','working_status','email','phone','mobile',
'epic','part_no','sl_no','post_stat','qualification','bank_account_no','branch_ifsc','subdivision','actemp','acpermanent','acofficename','emark'],
        btn_txt:'Download as CSV',
        agree: "",
      agree_text:
        "Certified that the details information furnished earlier in PP-2 format is verified with office records and genuine. Names of all officials has been included in PP-2 format and no information has been concealed.",
        pp_complete:false,
        dictionary: {
        custom: {

          agree: {
            required: "You must give the declartion on the bellow information"
          }
        }
        }

    }
  },
  beforeUpdate() {

  },
  methods:{
   agree_with_pp2(){
     if(this.agree==true){
       axios.post('/ppagree',{
            pp_agree: this.agree=true ? 1 : 0
          })
          .then((response, data) => {
          console.log(response.data)

        })
        .catch(error => {
          console.log(error)
        })
     }
   },
   is_agree_with_pp2(){

       axios.get('/getppagree',{
          })
          .then((response, data) => {
          if(response.data[0].pp_agree==1){
            this.agree=true
          }

        })
        .catch(error => {
          console.log(error)
        })

   },
   initialize() {
      this.tableloading=true
      axios.get('/print/pp2/'+this.getuser.user_id,{
            report: 'pp2',
            officeId: this.getuser.user_id
          })
        .then((response, data) => {
          if(response.data.length !=0 && response.data['mode']!='out_of_range'){
            if(parseInt(this.getdashboard.totalemployee)== parseInt(this.getdashboard.officeStuff)){
            this.pp_complete=true
            }
            var i=1;
            response.data.forEach(item => {
                item['sl']=i
                this.reports.push(item)
                i++
            })
              //this.$store.dispatch('storePP2report', this.reports)
              this.tableloading=false
              this.loadingTXT='Download as CSV'
          }
          else if(response.data['mode']=='out_of_range'){
            this.loadingTXT=response.data['message']
          }
          else{
            this.loadingTXT='No data found'
          }

        })
        .catch(error => {
          console.log(error)
        })
      }

  },

  created(){
    this.is_agree_with_pp2()
    if(parseInt(this.getdashboard.totalemployee)== parseInt(this.getdashboard.officeStuff)){
    this.initialize()
    }else{
      this.loadingTXT="Please note, Checklist will be available only after 100% personnel entry."
      this.tableloading=true
    }

  },
  computed:{
     getuser(){
        return this.$store.getters.getUser
      },
      getppdata(){
        return this.$store.getters.getpp2report
      },
       getdashboard:function(){
      return this.$store.getters.getDashboard
    },
  }
}
</script>
<style scoped>
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th,.v-table thead tr:first-child{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

