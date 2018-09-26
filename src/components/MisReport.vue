<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <h1 class="headline" >MIS Report <v-spacer></v-spacer>As On {{ new Date().toLocaleString() }}</h1><v-btn fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'MIS Report - Districtwise',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css' })"><v-icon dark>print</v-icon></v-btn>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <h1 class="headline">Districtwise Male</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="25%" rowspan="2"><strong>District</strong></th>
                <th width="15%" rowspan="2"><strong>Requirement <br>of Polling <br>Personnel</strong></th>
                <th width="50%" colspan="5"><strong>Available Male</strong></th>

                </tr>
                <tr>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>

                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad">{{ report.PR_M }}</td>
                  <td class="nopad">{{ report.P1_M }}</td>
                  <td class="nopad">{{ report.P2_M }}</td>
                  <td class="nopad">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>

                  </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <h1 class="headline">Districtwise Female </h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" id=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Dist ID</strong></th>
                <th width="25%" rowspan="2"><strong>District</strong></th>
                <th width="15%" rowspan="2"><strong>Requirement <br>of Polling <br>Personnel</strong></th>

                <th width="50%" colspan="5"><strong>Available Female</strong></th>
                </tr>
                <tr>

                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td class="nopad">{{ report.district_id }}</td>
                  <td class="nopad"><router-link :to="{ path: 'district/'+report.district_id}">{{ report.name }}</router-link></td>
                  <td class="nopad">{{ report.female_party }}</td>

                  <td class="nopad">{{ report.PR_F }}</td>
                  <td class="nopad">{{ report.P1_F }}</td>
                  <td class="nopad">{{ report.P2_F }}</td>
                  <td class="nopad" >{{ report.P3_F }}</td>
                  <td class="nopad">{{ report.MO_F }}</td>
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
  name: 'MisReport',
  props: {

  },
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
    axios.get('/report')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
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
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

