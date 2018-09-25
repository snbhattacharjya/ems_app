<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap  class="my-5">
          <v-flex xs12>
            <h1 class="headline">MIS Report (Districtwise)</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th rowspan="2"><strong>Dist ID</strong></th>
                <th rowspan="2"><strong>District</strong></th>
                <th rowspan="2"><strong>Districtwise<br> Requirement</strong></th>
                <th colspan="5"><strong>Male</strong></th>
                <th colspan="5"><strong>Female</strong></th>
                </tr>
                <tr>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-for="report in reports" :prop="report" :key="report.district_id">
                  <td >{{ report.district_id }}</td>
                  <td ><router-link :to="{ path: 'misreport/'+report.district_id}">{{ report.name }}</router-link></td>
                  <td >{{ report.party }}</td>
                  <td >{{ report.PR_M }}</td>
                  <td >{{ report.P1_M }}</td>
                  <td >{{ report.P2_M }}</td>
                  <td >{{ report.P3_M }}</td>
                  <td >{{ report.MO_M }}</td>
                  <td >{{ report.PR_F }}</td>
                  <td >{{ report.P1_F }}</td>
                  <td >{{ report.P2_F }}</td>
                  <td >{{ report.P3_F }}</td>
                  <td >{{ report.MO_F }}</td>
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
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1);}
</style>

