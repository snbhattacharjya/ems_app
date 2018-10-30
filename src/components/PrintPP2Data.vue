<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
        <v-flex xs11><h1 class="headline" >PP2 Report As On {{ new Date().toLocaleString() }}<br>{{ getuser.name }}({{getuser.user_id}})</h1></v-flex><v-flex xs1><v-btn fab dark small color="primary" id="printbtn" onclick="printJS({ printable: 'report', type: 'html',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn']  })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <!-- <h1 class="headline">Districtwise Male</h1> -->
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
              <tbody>
                <tr v-if="tableloading"><td><v-card-text  class="info--text text-center">{{this.loadingTXT}}</v-card-text></td></tr>
              <tr v-for="report in reports" :prop="report" :key="report.office_id">
              <td>
                <v-layout row wrap class="my-2">
                  <v-flex xs12>
                    <strong>{{report.sl}} ) </strong>
                    <strong>Name : </strong>{{report.empname}} <strong>Designation : </strong>{{report.designation}}
                    <strong>Present Address : </strong>{{report.present_address}} <strong>Permanent Address : </strong>{{report.permanent_address}}
                    <strong>Date of Birth : </strong>{{report.dob}} <strong>Gender : </strong>{{report.gender}}
                    <strong>Pay Scale : </strong>{{report.scale}} <strong>Basic Pay : </strong>{{report.basic_pay}} <strong>Grade Pay : </strong>{{report.grade_pay}} <strong>Pay Level : </strong>{{report.pay_level}}
                    <strong>Employee Group : </strong>{{report.emp_group}} <strong>Working Status : </strong>{{report.working_status}} <strong>Email : </strong>{{report.email}} <strong>Phone : </strong>{{report.phone}} <strong>Mobile : </strong>{{report.mobile}}
                    <strong>Epic No : </strong>{{report.epic}} <strong>Part No : </strong>{{report.part_no}} <strong>Serial No : </strong>{{report.sl_no}} <strong>Post Status : </strong>{{report.post_stat}}
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
export default {
  name: 'PrintPP2Data',

  data(){
    return {
      reports:[],
      search: '',
      loadingTXT:'Loading....',
      tableloading:false,



    }
  },
  beforeUpdate() {

  },
  methods:{
   initialize() {
      this.tableloading=true
      axios.get('/print/pp2/'+this.getuser.user_id,{
            report: 'pp2',
            officeId: this.getuser.user_id
          })
        .then((response, data) => {
          if(response.data.length !=0){
            var i=1;
            response.data.forEach(item => {
                item['sl']=i
                this.reports.push(item)
                i++
            })
              this.$store.dispatch('storePP2report', this.reports)
              this.tableloading=false
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
    if(this.getppdata != ''){console.log('PP2 -'+this.getppdata)
    this.reports=this.getppdata
    console.log('PP2 from store - '+this.reports)
    }
    else{console.log('PP2 - No data')
        this.initialize()
    }

  },
  computed:{
     getuser(){
        return this.$store.getters.getUser
      },
      getppdata(){
        return this.$store.getters.getpp2report
      }
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

