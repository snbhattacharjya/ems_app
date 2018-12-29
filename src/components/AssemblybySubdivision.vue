<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ getUser.district[0]}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">Assemblywise Analysis Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-3" id=""  border=1>
                <thead>
                <tr>

                <th width="20%"><strong>Assembly</strong></th>
                <th width="20%" ><strong>Parliamentary<br> Constituency </strong></th>
                <th width="20%" ><strong>Subdivision</strong></th>
                <th width="10%"><strong>No of Party</strong></th>
                <th width="15%"><strong>20%</strong></th>
                <th width="15%"><strong>With 20%</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports['subdivisionWiseAssemblyReport']" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.id }} - {{ report.name }}</td>
                  <td class="nopad">{{ report.pc_id }} - {{report.pcname}}</td>
                  <td class="nopad">{{ report.subdivision_id }} - {{report.subdivisions}}</td>
                  <td class="nopad">{{ report.male_party_count }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2),0) }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2)+report.male_party_count,0)}}</td>
                  </tr>
                  <tr>
                    <td class="nopad">Total</td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad">{{reports['subdivisionWiseAssemblyReport']['total']}}</td>
                    <td class="nopad">{{Math.round((reports['subdivisionWiseAssemblyReport']['total']*0.2),0)}}</td>
                    <td class="nopad">{{Math.round((reports['subdivisionWiseAssemblyReport']['total']*1.2),0)}}</td>
                  </tr>
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Subdivisionwise Report </h1>
            <v-layout row wrap >
              <table v-for="(report,index) in reports['subdivisionwise']" :prop="report" :key="index"  class="v-datatable v-table dark my-2" id=""  border=1>
                <thead>
                <tr><td colspan="6"><strong>{{index}}</strong></td></tr>
                <tr>

                <th width="25%"><strong>Assembly</strong></th>
                <th width="25%" ><strong>Parliamentary<br> Constituency </strong></th>
                <th width="25%" ><strong>Subdivision</strong></th>
                <th width="8%"><strong>No of Party</strong></th>
                <th width="8%"><strong>20%</strong></th>
                <th width="9%"><strong>With 20%</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports['subdivisionwise'][index]" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.id }} - {{ report.name }}</td>
                  <td class="nopad">{{ report.pc_id }} - {{report.pcname}}</td>
                  <td class="nopad">{{ report.subdivision_id }} - {{report.subdivisions}}</td>
                  <td class="nopad">{{ report.male_party_count }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2),0) }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2)+report.male_party_count,0)}}</td>
                  </tr>
                  <!-- <tr>
                    <td class="nopad">Total</td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                  </tr> -->
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">PC wise Report </h1>
            <v-layout row wrap >
              <table v-for="(report,index) in reports['pcwise']" :prop="report" :key="index"  class="v-datatable v-table dark my-2" id=""  border=1>
                <thead>
                <tr><td colspan="6"><strong>{{index}}</strong></td></tr>
                <tr>

                <th width="25%"><strong>Assembly</strong></th>
                <th width="25%" ><strong>Parliamentary<br> Constituency </strong></th>
                <th width="25%" ><strong>Subdivision</strong></th>
                <th width="8%"><strong>No of Party</strong></th>
                <th width="8%"><strong>20%</strong></th>
                <th width="9%"><strong>With 20%</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports['pcwise'][index]" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.id }} - {{ report.name }}</td>
                  <td class="nopad">{{ report.pc_id }} - {{report.pcname}}</td>
                  <td class="nopad">{{ report.subdivision_id }} - {{report.subdivisions}}</td>
                  <td class="nopad">{{ report.male_party_count }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2),0) }}</td>
                  <td class="nopad">{{ Math.round((report.male_party_count*0.2)+report.male_party_count,0)}}</td>
                  </tr>
                  <!-- <tr>
                    <td class="nopad">Total</td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                    <td class="nopad"></td>
                  </tr> -->
                </tbody>
              </table>
            </v-layout>
          </v-flex>
          <v-flex xs12 my-5></v-flex>
           <v-snackbar v-model="snackbar" :multi-line="false" :timeout=0 :value=show_message :color=message_type :topo=true>{{ message_text }}<v-btn dark flat @click="snackbar = false">Close</v-btn>
          </v-snackbar>
        </v-layout>

      </section>
    </v-container>

  </div>

</template>




<script>
export default {
  name: 'AssemblybySubdivision',
  props: {

  },
  data(){
    return {
      reports:[],
      search: '',
      count:1,
      tableloading:false,
      disable_save:false,
      loadingtxt:'Loading...',
      snackbar: false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
      total:0
    }
  },

  methods:{
     show:function(){
          this.tableloading=true
          this.disable_save=true
          this.reports=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/subdivisionwiseassemblyreport')
              .then((response, data) => {
                if(response.data.length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  this.reports= response.data

                  response.data['subdivisionWiseAssemblyReport'].forEach(item => { //console.log(item)
                     this.total += parseInt(item.male_party_count)
                      this.reports['subdivisionWiseAssemblyReport']['total']=this.total
                  })
                  // response.data['subdivisionwise'].forEach(item, index => { console.log(response.data['subdivisionwise'][index])
                  //   //  this.total += parseInt(item.male_party_count)
                  //   //   this.reports['subdivisionWiseAssemblyReport']['total']=this.total
                  // })
                  Object.keys(response.data['subdivisionwise']).forEach(function(key) {

                    console.log('Key -'+key, 'Item -'+response.data['subdivisionwise'][key])
                    response.data['subdivisionwise'][key].forEach(item => {
                      console.log(item)
                    //this.total=0
                    //this.total += parseInt(item.male_party_count)

                    })
                    console.log('Key after -'+key)
                    //this.reports['subdivisionwise'][key]['total']=this.total
                  })
                  //console.log(this.reports['subdivisionwise'])
                  this.tableloading=false
                  this.disable_save=false
                }
              })
              .catch(error => {
                console.log(error)
              })


     },


  },
  computed: {
      getUser:function(){
        return this.$store.getters.getUser
      }
    },
  created(){
   this.show()

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
