<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section>
        <v-layout row wrap  class="my-5">
          <v-flex xs12>
            <h1 class="headline">MIS Report (Subdivisionwise)</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th rowspan="2"><strong>Subdiv ID</strong></th>
                <th rowspan="2"><strong>Subdivision</strong></th>
                <th rowspan="2"><strong>Subdivisionwise<br> Requirement</strong></th>
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
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.subdivision_id">
                  <td >{{ report.subdivision_id }}</td>
                  <td >{{ report.name }}</td>
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
  name: 'MisreportSubdivision',
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
    axios.get('/subdivisionreport/'+this.$route.params.id)
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

