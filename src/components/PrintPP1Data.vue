<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
        <v-flex xs11><h1 class="headline" >Office Details in PP1 Format As On {{ moment(new Date()).format('DD/MM/YYYY h:mm a') }}<br>{{reports[0].name}}({{reports[0].officeID}}) , {{reports[0].district}}</h1></v-flex><v-flex xs1><v-btn fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css' })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <!-- <h1 class="headline">Districtwise Male</h1> -->
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                  <tr>
                    <td width="30%"><h2>Office</h2></td>
                    <td width="70%"><h2>Details</h2></td>
                  </tr>
                </thead>
                <tbody>

                  <tr>
                    <td>Office Name </td>
                    <td><strong>{{reports[0].name}}</strong> ({{reports[0].officeID}})<br> <strong>Identification code: </strong>{{reports[0].identification_code}}</td>
                  </tr>
                  <tr>
                    <td>Office Address</td>
                    <td>{{reports[0].address}}<br> <strong>Post Office:</strong> {{reports[0].post_office}}, <strong>Pin:</strong> {{reports[0].pin}}
                    <br> <strong>Subdivision:</strong> {{reports[0].subdivision}}<br> <strong>Block/ Municipality:</strong> {{reports[0].block}}<br>
                    <strong>Police Station: </strong>{{reports[0].police}}, <strong>Assembly Constituency: </strong>{{reports[0].acname}}<br>
                    </td>
                  </tr>
                  <tr>
                    <td>Office Category </td>
                    <td>{{reports[0].category}}</td>
                  </tr>
                  <tr>
                    <td>Office type </td>
                    <td>{{reports[0].institute}}</td>
                  </tr>
                  <tr>
                    <td>Email </td>
                    <td>{{reports[0].email}}</td>
                  </tr>
                  <tr>
                    <td>Contact Details(Mobile/Phone/fax) </td>
                    <td>{{reports[0].mobile}} / {{reports[0].phone}} / {{reports[0].fax}}</td>
                  </tr>
                  <tr>
                    <td>Total Employees </td>
                    <td>{{reports[0].total_staff}}</td>
                  </tr>
                  <tr>
                    <td>Male </td>
                    <td>{{reports[0].male_staff}}</td>
                  </tr>
                  <tr>
                    <td>Female </td>
                    <td>{{reports[0].female_staff}}</td>
                  </tr>
                  <tr>
                    <td>PP1 Last Updated at </td>
                    <td>{{moment(reports[0].updated_at).format('DD/MM/YYYY h:mm a')}}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><h3>Employee Details</h3></td>
                  </tr>
                  <tr>
                    <td>Total Employees </td>
                    <td>{{reports[0].total_staff}}</td>
                  </tr>
                  <tr>
                    <td>Male </td>
                    <td>{{reports[0].male_staff}}</td>
                  </tr>
                  <tr>
                    <td>Female </td>
                    <td>{{reports[0].female_staff}}</td>
                  </tr>
                  <tr>
                    <td colspan="2"><h3>Employee Remarks</h3></td>
                  </tr>
                  <tr>
                    <td><h3>Remarks</h3> </td>
                    <td><h3>Employee Count</h3></td>
                  </tr>
                  <tr>
                    <td>Physically Handicapped </td>
                    <td>{{reports[0].phy}}</td>
                  </tr>
                  <tr>
                    <td>NONE </td>
                    <td>{{reports[0].none}}</td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <h3><i class="material-icons">done_all</i>  Certified that the details information furnished earlier in PP-1 format is verified with office records and genuine. Names of all officials will be included in PP-2 format and no information has been concealed.</h3>
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
    axios.get('/print/pp1/'+this.$route.params.id,{
          report: 'pp1',
          officeId: this.$route.params.id
        })
      .then((response, data) => {
       response.data.forEach(item => {

          this.reports.push(item)
        });
        this.tableloading=false
      })
      .catch(error => {
        console.log(error)
      })
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

