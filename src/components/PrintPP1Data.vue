<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
        <v-flex xs11><h1 class="headline" >Office Details in PP1 Format As On {{ moment(new Date()).format('DD/MM/YYYY h:mm a') }}<br>{{reports[0].name}}({{reports[0].officeID}}) , {{reports[0].district}}</h1></v-flex><v-flex xs1><v-btn fab dark small color="primary" id="printbtn" onclick="printJS({ printable: 'report', type: 'html',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <!-- <h1 class="headline">Districtwise Male</h1> -->
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                  <tr>
                    <td width="30%"><h2><strong>Office</strong></h2></td>
                    <td width="70%"><h2><strong>Details</strong></h2></td>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td><strong>Office Name</strong> </td>
                    <td><strong>{{reports[0].name}}</strong> ({{reports[0].officeID}})<br> <strong>Identification code(Like DDO/IFSC/DISE CODE) : </strong>{{reports[0].identification_code}}</td>
                  </tr>
                  <tr>
                    <td><strong>Office Address</strong></td>
                    <td>{{reports[0].address}}<br> <strong>Post Office :</strong> {{reports[0].post_office}}, <strong>Pin :</strong> {{reports[0].pin}}
                    <br> <strong>Subdivision :</strong> {{reports[0].subdivision}}, <strong>Block/ Municipality :</strong> {{reports[0].block}}<br>
                    <strong>Police Station : </strong>{{reports[0].police}}, <strong>Assembly Constituency : </strong>{{reports[0].acname}}<br>
                    </td>
                  </tr>
                  <tr>
                    <td><strong>Office Category & Office type</strong> </td>
                    <td>{{reports[0].category}} , {{reports[0].institute}}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong> </td>
                    <td>{{reports[0].email}}</td>
                  </tr>
                  <tr>
                    <td><strong>Contact Details(Mobile/Phone/fax)</strong> </td>
                    <td>{{reports[0].mobile}} / {{reports[0].phone}} / {{reports[0].fax}}</td>
                  </tr>
                  <tr>
                    <td><strong>Total Employees</strong> </td>
                    <td>{{reports[0].total_staff}}</td>
                  </tr>
                  <tr>
                    <td><strong>Male</strong> </td>
                    <td>{{reports[0].male_staff}}</td>
                  </tr>
                  <tr>
                    <td><strong>Female</strong> </td>
                    <td>{{reports[0].female_staff}}</td>
                  </tr>
                  <tr>
                    <td><strong>PP1 Last Updated at</strong> </td>
                    <td>{{moment(reports[0].updated_at).format('DD/MM/YYYY h:mm a')}}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><h3>Employee Details registered so far online</h3></td>
                  </tr>
                  <tr>
                    <td><strong>Total Employees</strong> </td>
                    <td>{{parseInt(reports[1].maleEntry) + parseInt(reports[1].femaleEntry)}}</td>
                  </tr>
                  <tr>
                    <td><strong>Male</strong> </td>
                    <td>{{reports[1].maleEntry}}</td>
                  </tr>
                  <tr>
                    <td><strong>Female</strong> </td>
                    <td>{{reports[1].femaleEntry}}</td>
                  </tr>

                  <tr>
                    <td colspan="2">
                      <v-layout row wrap class="my-2">
                        <v-flex xs12>
                          <h2>DECLARATION :</h2>
                          <h3>Certified that the details information furnished earlier in PP-1 format is verified with office records and genuine. Names of all officials will be included in PP-2 format and no information has been concealed.</h3>
                        </v-flex>
                      </v-layout>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <v-layout row wrap class="mb-2">
                        <v-flex class="xs5 mt-5"><strong>Date : </strong><br><br><strong>Place : </strong></v-flex>
                        <v-flex class="xs7 mt-5"><h3 class="mt-5">----------------------------------------------------------<br>
                        Signature with Office Seal of Officer-in-Charge<br>({{reports[0].name}})</h3></v-flex>

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
  name: 'PrintPP1Data',

  data(){
    return {
      reports:[],
      search: '',
      tableloading:false,



    }
  },

  methods:{


  },

  created(){
    this.tableloading=true
    axios.get('/print/pp1/'+this.getuser.user_id,{
          report: 'pp1',
          officeId: this.getuser.user_id
        })
      .then((response, data) => {
        //console.log(response.data)
       response.data['result'].forEach(item => {
          this.reports.push(item)
        });
        response.data['actualEMpEntry'].forEach(item => {
          this.reports.push(item)
        });
        console.log(this.reports)
        this.tableloading=false
      })
      .catch(error => {
        console.log(error)
      })
  },
  computed:{
     getuser(){
        return this.$store.getters.getUser
      }
  }
}
</script>
<style scoped>
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th,.v-table thead tr:first-child{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 10 24px;}
</style>

