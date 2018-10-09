<template>
  <div id="pageDashboard">
    <v-container fluid>
      <section id="report">
        <v-layout row wrap>
         <v-flex xs11><h1 class="headline" >MIS Report for {{ this.district}} As On {{ new Date().toLocaleString() }}</h1></v-flex><v-flex xs1><v-btn id="printbtn" fab dark small color="primary" onclick="printJS({ printable: 'report', type: 'html', header: 'MIS Report - Districtwise',css: 'https://cdn.jsdelivr.net/npm/vuetify/dist/vuetify.min.css',ignoreElements:['printbtn'] })"><v-icon dark>print</v-icon></v-btn></v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 class="my-5">
            <v-layout row wrap >
              <v-flex xs9>
                <v-select
                :items="districts"
                v-model="district_id"
                item-text= "name"
                item-value= "id"
                prepend-icon="list"
                label="Select district"
                >
              </v-select>
              </v-flex>
              <v-flex xs3>
                <v-btn color="primary" @click="show" :disabled="disable_save">Show</v-btn>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 >
            <h1 class="headline">Assemblywise Report </h1>
            <v-layout row wrap >
              <table  class="v-datatable v-table dark my-5" id=""  border=1>
                <thead>
                <tr>
                <th width="10%" ><strong>Serial No</strong></th>
                <th width="10%"><strong>Assembly ID</strong></th>
                <th width="30%" ><strong>Assembly Name</strong></th>
                <th width="25%" ><strong>No of Polling Booth(Male)</strong></th>
                <th width="25%"><strong>No of Polling Booth(Female)</strong></th>
                </tr>

                </thead>
                <tbody>
                  <tr v-if="tableloading"><td colspan="13"><v-card-text  class="info--text text-center">{{this.loadingtxt}}</v-card-text></td></tr>
                  <tr v-for="report in reports" :prop="report" :key="report.id">
                  <td class="nopad">{{ report.sl }}</td>
                  <td class="nopad">{{ report.id }}</td>
                  <td class="nopad">{{ report.name }}</td>
                  <td class="nopad">{{ report.male_party_count }}</td>
                  <td class="nopad">{{ report.female_party_count }}</td>

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
  name: 'MisReportAssembly',
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
      dist_old:''
    }
  },

  methods:{
     show:function(){
       if(this.dist_old != '' && this.district_id === this.dist_old){
          console.log('same district')

       }
       else{
          this.dist_old=this.district_id
          this.tableloading=true
          this.disable_save=true
          this.reports=[]
          this.count=1
          this.loadingtxt='Loading...'
            axios.get('/assemblyreport/'+this.district_id)
              .then((response, data) => { console.log(response.data['available'].length)
                if(response.data['available'].length === 0){

                  this.loadingtxt='No data found'
                  this.disable_save=false

                }
                else{

                  response.data['available'].forEach(item => { //console.log(item)
                      item['sl']=this.count
                      this.reports.push(item)
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

     }

  },

  created(){

    axios.get('/getdistrict')
      .then((response, data) => { //console.log(response.data['available'])
       response.data.forEach(item => { //console.log(item)
          this.districts.push(item)
        });

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

