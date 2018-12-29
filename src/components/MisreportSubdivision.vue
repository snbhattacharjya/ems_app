<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'Polling Personnel Management System',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <h1 class="headline">Subdivisionwise PP Requirement Male</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Subdiv ID</strong></th>
                <th width="25%" rowspan="2"><strong>Subdivision</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>
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
                  <tr v-for="report in reports" :prop="report" :key="report.subdivision_id">
                  <td class="nopad">{{ report.subdivision_id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.male_party }}</td>
                  <td class="nopad" :class="report.PR_M_class">{{ report.PR_M }}</td>
                  <td class="nopad" :class="report.P1_M_class">{{ report.P1_M }}</td>
                  <td class="nopad" :class="report.P2_M_class">{{ report.P2_M }}</td>
                  <td class="nopad" :class="report.P3_M_class">{{ report.P3_M }}</td>
                  <td class="nopad">{{ report.MO_M }}</td>

                  </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 mb-5>
            <h1 class="headline">Subdivisionwise PP Requirement Female</h1>
            <v-layout row wrap >
              <table class="v-datatable v-table dark" style=""  border=1>
                <thead>
                <tr>
                <th width="10%" rowspan="2"><strong>Subdiv ID</strong></th>
                <th width="25%" rowspan="2"><strong>Subdivision</strong></th>
                <th width="15%" rowspan="2"><strong>Actual Requirement of<br> Polling Personnel<br> of each category</strong></th>
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
                  <tr v-for="report in reports" :prop="report" :key="report.subdivision_id">
                  <td class="nopad">{{ report.subdivision_id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.female_party }}</td>
                  <td class="nopad" :class="report.PR_F_class">{{ report.PR_F }}</td>
                  <td class="nopad" :class="report.P1_F_class">{{ report.P1_F }}</td>
                  <td class="nopad" :class="report.P2_F_class">{{ report.P2_F }}</td>
                  <td class="nopad" :class="report.P3_F_class">{{ report.P3_F }}</td>
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
  name: 'MisreportSubdivision',
  props: {

  },
  data(){
    return {
      reports:[],
      search: '',
      tableloading:false,
      district:'',
      item_class:''
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
      //  item.PR_M_class=this.createclass(item.PR_M,item.male_party)
      //     item.P1_M_class=this.createclass(item.P1_M,item.male_party)
      //     item.P2_M_class=this.createclass(item.P2_M,item.male_party)
      //     item.P3_M_class=this.createclass(item.P3_M,item.male_party)
      //     item.PR_F_class=this.createclass(item.PR_F,item.female_party)
      //     item.P1_F_class=this.createclass(item.P1_F,item.female_party)
      //     item.P2_F_class=this.createclass(item.P2_F,item.female_party)
      //     item.P3_F_class=this.createclass(item.P3_F,item.female_party)
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

