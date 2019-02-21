<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'Polling Personnel Management System',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <h1 class="headline">Subdivisionwise  PP Requirement & Available(Male)</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="5%" rowspan="2"><strong>Subdiv ID</strong></th>
                <th width="20%" rowspan="2"><strong>Subdivision</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>
                <th width="60%" colspan="8"><strong>Available Male</strong></th>
                </tr>
                <tr>
                <th>Not <br> Assigned</th>
                <th>AEO</th>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Exemted</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.subdivision_id">
                  <td class="nopad">{{ report.subdivision_id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.NA_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.AEO_M }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.PR_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.P1_M }}</td>
                  <td class="nopad" :class="report.P2_M_class">{{ report.P2_M }}</td>
                  <td class="nopad" :class="report.P3_M_class">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>
                  <td class="nopad">{{ report.EXE_M }}</td>
                  </tr>
                  <tr >
                    <td></td>
                    <td class="nopad"><strong>Total</strong></td>
                    <td class="nopad">{{male_party_count}}</td>
                    <td class="nopad">{{NA_M_COUNT}}</td>
                    <td class="nopad">{{AEO_M_COUNT}}</td>
                    <td class="nopad">{{PR_M_COUNT}} </td>
                    <td class="nopad">{{P1_M_COUNT}}</td>
                    <td class="nopad">{{P2_M_COUNT}}</td>
                    <td class="nopad">{{P3_M_COUNT}}</td>
                    <td class="nopad">{{MO_M_COUNT}}</td>
                    <td class="nopad">{{EXE_M_COUNT}}</td>
                   </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 mb-5>
            <h1 class="headline">Subdivisionwise PP Requirement & Available(Female)</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="5%" rowspan="2"><strong>Subdiv ID</strong></th>
                <th width="20%" rowspan="2"><strong>Subdivision</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>
                <th width="60%" colspan="8"><strong>Available Female</strong></th>
                </tr>
                <tr>
                <th>Not <br> Assigned</th>
                <th>AEO</th>
                <th>PR</th>
                <th>P1</th>
                <th>P2</th>
                <th>P3</th>
                <th>MO</th>
                <th>Exemted</th>
                </tr>
                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">Loading...</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.subdivision_id">
                  <td class="nopad">{{ report.subdivision_id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.female_party }}</td>
                  <td class="nopad" :class="report.PR_F_class">{{ report.NA_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.AEO_F }}</td>
                  <td class="nopad" :class="report.PR_F_class">{{ report.PR_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.P1_F }}</td>
                  <td class="nopad" :class="report.P2_F_class">{{ report.P2_F }}</td>
                  <td class="nopad" :class="report.P3_F_class">{{ report.P3_F }}</td>
                  <td class="nopad">{{ report.MO_F }}</td>
                  <td class="nopad">{{ report.EXE_F }}</td>
                  </tr>
                  <tr >
                    <td></td>
                    <td class="nopad"><strong>Total</strong></td>
                    <td class="nopad">{{female_party_count}}</td>
                    <td class="nopad">{{NA_F_COUNT}}</td>
                    <td class="nopad">{{AEO_F_COUNT}}</td>
                    <td class="nopad">{{PR_F_COUNT}} </td>
                    <td class="nopad">{{P1_F_COUNT}}</td>
                    <td class="nopad">{{P2_F_COUNT}}</td>
                    <td class="nopad">{{P3_F_COUNT}}</td>
                    <td class="nopad">{{MO_F_COUNT}}</td>
                    <td class="nopad">{{EXE_F_COUNT}}</td>
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
      district:'',
      item_class:'',
      male_party_count:0,
      female_party_count:0,
      PR_M_COUNT:0,
      P1_M_COUNT:0,
      P2_M_COUNT:0,
      P3_M_COUNT:0,
      PR_F_COUNT:0,
      P1_F_COUNT:0,
      P2_F_COUNT:0,
      P3_F_COUNT:0,
      MO_M_COUNT:0,
      MO_F_COUNT:0,
      NA_M_COUNT:0,
      NA_F_COUNT:0,
      AEO_M_COUNT:0,
      AEO_F_COUNT:0,
      EXE_M_COUNT:0,
      EXE_F_COUNT:0,
    }
  },

  methods:{
    createclass:function(item,compare){
      if(compare > item){this.item_class='red--text'}
      else if(compare <= item){this.item_class='green--text'}
      else{ this.item_class='green--text' }

      return this.item_class
    }

  },

  created(){
    this.tableloading=true
    axios.get('/subdivisionreport/'+this.$route.params.id)
      .then((response, data) => { //console.log(response.data['available'])
       response.data['available'].forEach(item => { //console.log(item)
          this.PR_M_COUNT+=parseInt(item.PR_M)
              this.P1_M_COUNT+=parseInt(item.P1_M)
              this.P2_M_COUNT+=parseInt(item.P2_M)
              this.P3_M_COUNT+=parseInt(item.P3_M)
              this.PR_F_COUNT+=parseInt(item.PR_F)
              this.P1_F_COUNT+=parseInt(item.P1_F)
              this.P2_F_COUNT+=parseInt(item.P2_F)
              this.P3_F_COUNT+=parseInt(item.P3_F)
              this.male_party_count+=parseInt(item.male_party)
              this.female_party_count+=parseInt(item.female_party)
              this.MO_M_COUNT+=parseInt(item.MO_M)
              this.MO_F_COUNT+=parseInt(item.MO_F)
              this.NA_M_COUNT+=parseInt(item.NA_M)
              this.NA_F_COUNT+=parseInt(item.NA_F)
              this.AEO_M_COUNT+=parseInt(item.AEO_M)
              this.AEO_F_COUNT+=parseInt(item.AEO_F)
               this.EXE_M_COUNT+=parseInt(item.EXE_M)
              this.EXE_F_COUNT+=parseInt(item.EXE_F)
          this.reports.push(item)
        });
        this.district=response.data['district']
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
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;  border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

