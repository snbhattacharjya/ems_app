<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleDateString('en-GB') }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html',header: 'Polling Personnel Management System', css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn','exclude','clk2e'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap >

          <v-flex xs12 >
            <h1 class="headline">District wise Polling Personnel Status Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="3%" ><strong>ID</strong></th>
                <th width="15%"><strong>Name</strong></th>
                <th width="10%" ><strong>Total Offices</strong></th>
                <th width="10%" ><strong>PP1 <br> Updated</strong></th>
                <th width="10%"><strong>PP1 Not <br>Updated</strong></th>
                <th width="10%"><strong>Total PP<br> Declared</strong></th>
                <th width="10%"><strong>Male PP<br> Declared</strong></th>
                <th width="10%"><strong>Male PP<br> Added</strong></th>
                <th width="10%"><strong>Female PP<br>Declared</strong></th>
                <th width="10%"><strong>Female PP<br> Added</strong></th>
                <th width="10%"><strong>Total PP<br> Added</strong></th>
                <th width="10%"><strong>Percentage<br>(PP2)</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.name">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.Total_Offices }}</td>
                  <td class="nopad">{{ report.PP1_Updated }}</td>
                  <td class="nopad">{{ report.PP1_Not_Updated }}</td>
                  <td class="nopad">{{ report.Total_PP_Declared }}</td>
                  <td class="nopad">{{ report.Male_PP_Declared }}</td>
                  <td class="nopad">{{ report.Male_PP_Added }}</td>
                  <td class="nopad">{{ report.Female_PP_Declared }}</td>
                  <td class="nopad">{{ report.Female_PP_Added }}</td>
                  <td class="nopad">{{ report.Total_PP_Added }}</td>
                  <td class="nopad">{{ report.percentage_pp2 }}%</td>
                  </tr>
                  <tr>
                    <td colspan="2" class="nopad"><strong>Total</strong></td>
                    <td class="nopad">{{this.sum_Total_Offices}}</td>
                    <td class="nopad">{{this.sum_PP1_Updated}}</td>
                    <td class="nopad">{{this.sum_PP1_Not_Updated}}</td>
                    <td class="nopad">{{this.sum_Total_PP_Declared}}</td>
                    <td class="nopad">{{this.sum_Male_PP_Declared}}</td>
                    <td class="nopad">{{this.sum_Male_PP_Added}}</td>
                    <td class="nopad">{{this.sum_Female_PP_Declared}}</td>
                    <td class="nopad">{{this.sum_Female_PP_Added}}</td>
                    <td class="nopad">{{this.sum_Total_PP_Added}}</td>
                    <td class="nopad">{{((parseInt(this.sum_Total_PP_Added)/parseInt(this.sum_Total_PP_Declared))*100).toFixed(2)}}%</td>
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
  name: 'DistrictwiseppStatus',
  props: {

  },
  data(){
    return {
      reports:[],
      districts:[],
      district:'',
      district_id:'',
      search: '',
      count:1,
      tableloading:false,
      disable_save:false,
      loadingtxt:'Loading...',
      dist_old:'',
      snackbar: false,
      show_message: false,
      message_type: "",
      message_icon: "",
      message_text: "",
      sum_Total_Offices:0,
      sum_PP1_Updated:0,
      sum_PP1_Not_Updated:0,
      sum_Total_PP_Declared:0,
      sum_Male_PP_Declared:0,
      sum_Male_PP_Added:0,
      sum_Female_PP_Declared:0,
      sum_Female_PP_Added:0,
      sum_Total_PP_Added:0,
    }
  },

  methods:{
     show:function(){
          this.tableloading=true
          this.disable_save=true
          this.reports=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/personelProgressstatus')
              .then((response, data) => {
                if(response.datalength === 0){
                  this.loadingtxt='No data found'
                  this.disable_save=false
                }
                else{
                  response.data.forEach(item => {
                      item['sl']=this.count
                      if(!item['Total_PP_Declared']){
                        item['Total_PP_Declared']=0
                      }
                      if(!item['Male_PP_Declared']){
                        item['Male_PP_Declared']=0
                      }
                      if(!item['Male_PP_Added']){
                        item['Male_PP_Added']=0
                      }
                      if(!item['Female_PP_Declared']){
                        item['Female_PP_Declared']=0
                      }
                      if(!item['Female_PP_Added']){
                        item['Female_PP_Added']=0
                      }
                      if(!item['Total_PP_Added']){
                        item['Total_PP_Added']=0
                      }
                      item['percentage_pp2']=((parseInt(item['Total_PP_Added'])/parseInt(item['Total_PP_Declared']))*100).toFixed(2)
                      this.reports.sort(function(a, b){return b['percentage_pp2'] - a['percentage_pp2']})
                      this.reports.push(item)
                      this.sum_Total_Offices+= parseInt(item.Total_Offices)
                      this.sum_PP1_Updated+=parseInt(item.PP1_Updated)
                      this.sum_PP1_Not_Updated+=parseInt(item.PP1_Not_Updated)
                      this.sum_Total_PP_Declared+=parseInt(item.Total_PP_Declared)
                      this.sum_Male_PP_Declared+=parseInt(item.Male_PP_Declared)
                      this.sum_Male_PP_Added+=parseInt(item.Male_PP_Added)
                      this.sum_Female_PP_Declared+=parseInt(item.Female_PP_Declared)
                      this.sum_Female_PP_Added+=parseInt(item.Female_PP_Added)
                      this.sum_Total_PP_Added+=parseInt(item.Total_PP_Added)
                      this.count++
                    });
                    this.district=response.data['district']
                    this.tableloading=false
                    this.disable_save=false
                }
              })
              .catch(error => {
                console.log(error)
              })
       }
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
#clk2e{ display: none;}
#edt:hover  #clk2e{ display: block;}
table{table-layout: fixed; width: 100%;}
table tr td.nopad{ padding: 0 !important; text-align: center;}
table th tr, .application .theme--light.v-table tbody tr:not(:last-child), .theme--light .v-table tbody tr:not(:last-child){ border-bottom: 1px solid ! important;}
.application .theme--light.v-table thead th, .theme--light .v-table thead th{ color: rgba(0,0,0,1); padding: 0 10px !important;    border-bottom: 1px solid;}
table.v-table tbody td:first-child, table.v-table tbody td:not(:first-child), table.v-table tbody th:first-child, table.v-table tbody th:not(:first-child), table.v-table thead td:first-child, table.v-table thead td:not(:first-child), table.v-table thead th:first-child, table.v-table thead th:not(:first-child){ padding: 0 24px;}
</style>

